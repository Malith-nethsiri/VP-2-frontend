import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import api from '../utils/api';
import {
  MapPinIcon,
  GlobeAltIcon,
  BuildingOfficeIcon,
  MagnifyingGlassIcon,
  ClipboardDocumentListIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const Location = () => {
  const [activeTab, setActiveTab] = useState('geocode');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const tabs = [
    { id: 'geocode', name: 'Address to Coordinates', icon: MapPinIcon },
    { id: 'reverse', name: 'Coordinates to Address', icon: GlobeAltIcon },
    { id: 'amenities', name: 'Find Amenities', icon: BuildingOfficeIcon },
    { id: 'map', name: 'Generate Map', icon: ClipboardDocumentListIcon }
  ];

  const handleGeocode = async (data) => {
    setLoading(true);
    try {
      const response = await api.post('/location/geocode', {
        address: data.address
      });
      setResults({
        type: 'geocode',
        data: response.data
      });
      toast.success('Address geocoded successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Geocoding failed');
    } finally {
      setLoading(false);
    }
  };

  const handleReverseGeocode = async (data) => {
    setLoading(true);
    try {
      const response = await api.post('/location/reverse-geocode', {
        latitude: parseFloat(data.latitude),
        longitude: parseFloat(data.longitude)
      });
      setResults({
        type: 'reverse',
        data: response.data
      });
      toast.success('Coordinates reverse geocoded successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Reverse geocoding failed');
    } finally {
      setLoading(false);
    }
  };

  const handleFindAmenities = async (data) => {
    setLoading(true);
    try {
      const response = await api.post('/location/amenities', {
        latitude: parseFloat(data.latitude),
        longitude: parseFloat(data.longitude),
        radius: parseInt(data.radius) || 5000
      });
      setResults({
        type: 'amenities',
        data: response.data
      });
      toast.success('Amenities found successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Amenities search failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateMap = async (data) => {
    setLoading(true);
    try {
      const response = await api.post('/location/generate-map', {
        latitude: parseFloat(data.latitude),
        longitude: parseFloat(data.longitude),
        zoom: parseInt(data.zoom) || 15,
        size: data.size || '640x640',
        maptype: data.maptype || 'roadmap'
      });
      setResults({
        type: 'map',
        data: response.data
      });
      toast.success('Map generated successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Map generation failed');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (data) => {
    switch (activeTab) {
      case 'geocode':
        handleGeocode(data);
        break;
      case 'reverse':
        handleReverseGeocode(data);
        break;
      case 'amenities':
        handleFindAmenities(data);
        break;
      case 'map':
        handleGenerateMap(data);
        break;
      default:
        console.error('Unknown tab:', activeTab);
        break;
    }
  };

  const renderForm = () => {
    switch (activeTab) {
      case 'geocode':
        return (
          <div className="space-y-4">
            <div>
              <label className="form-label">Address</label>
              <input
                {...register('address', { required: 'Address is required' })}
                type="text"
                className="form-input"
                placeholder="Enter address (e.g., Colombo Fort, Sri Lanka)"
              />
              {errors.address && (
                <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
              )}
            </div>
          </div>
        );

      case 'reverse':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Latitude</label>
                <input
                  {...register('latitude', {
                    required: 'Latitude is required',
                    pattern: {
                      value: /^-?([0-8]?[0-9]|90)(\.[0-9]+)?$/,
                      message: 'Invalid latitude'
                    }
                  })}
                  type="number"
                  step="any"
                  className="form-input"
                  placeholder="6.9271"
                />
                {errors.latitude && (
                  <p className="mt-1 text-sm text-red-600">{errors.latitude.message}</p>
                )}
              </div>
              <div>
                <label className="form-label">Longitude</label>
                <input
                  {...register('longitude', {
                    required: 'Longitude is required',
                    pattern: {
                      value: /^-?([0-9]{1,2}|1[0-7][0-9]|180)(\.[0-9]+)?$/,
                      message: 'Invalid longitude'
                    }
                  })}
                  type="number"
                  step="any"
                  className="form-input"
                  placeholder="79.8612"
                />
                {errors.longitude && (
                  <p className="mt-1 text-sm text-red-600">{errors.longitude.message}</p>
                )}
              </div>
            </div>
          </div>
        );

      case 'amenities':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Latitude</label>
                <input
                  {...register('latitude', { required: 'Latitude is required' })}
                  type="number"
                  step="any"
                  className="form-input"
                  placeholder="6.9271"
                />
                {errors.latitude && (
                  <p className="mt-1 text-sm text-red-600">{errors.latitude.message}</p>
                )}
              </div>
              <div>
                <label className="form-label">Longitude</label>
                <input
                  {...register('longitude', { required: 'Longitude is required' })}
                  type="number"
                  step="any"
                  className="form-input"
                  placeholder="79.8612"
                />
                {errors.longitude && (
                  <p className="mt-1 text-sm text-red-600">{errors.longitude.message}</p>
                )}
              </div>
            </div>
            <div>
              <label className="form-label">Search Radius (meters)</label>
              <select {...register('radius')} className="form-input">
                <option value="1000">1 km</option>
                <option value="2000">2 km</option>
                <option value="5000">5 km</option>
                <option value="10000">10 km</option>
              </select>
            </div>
          </div>
        );

      case 'map':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Latitude</label>
                <input
                  {...register('latitude', { required: 'Latitude is required' })}
                  type="number"
                  step="any"
                  className="form-input"
                  placeholder="6.9271"
                />
                {errors.latitude && (
                  <p className="mt-1 text-sm text-red-600">{errors.latitude.message}</p>
                )}
              </div>
              <div>
                <label className="form-label">Longitude</label>
                <input
                  {...register('longitude', { required: 'Longitude is required' })}
                  type="number"
                  step="any"
                  className="form-input"
                  placeholder="79.8612"
                />
                {errors.longitude && (
                  <p className="mt-1 text-sm text-red-600">{errors.longitude.message}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="form-label">Zoom Level</label>
                <select {...register('zoom')} className="form-input">
                  <option value="10">10 (City)</option>
                  <option value="12">12 (Town)</option>
                  <option value="15">15 (Streets)</option>
                  <option value="18">18 (Buildings)</option>
                </select>
              </div>
              <div>
                <label className="form-label">Map Size</label>
                <select {...register('size')} className="form-input">
                  <option value="400x400">400x400</option>
                  <option value="640x640">640x640</option>
                  <option value="800x600">800x600</option>
                </select>
              </div>
              <div>
                <label className="form-label">Map Type</label>
                <select {...register('maptype')} className="form-input">
                  <option value="roadmap">Roadmap</option>
                  <option value="satellite">Satellite</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="terrain">Terrain</option>
                </select>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderResults = () => {
    if (!results) return null;

    switch (results.type) {
      case 'geocode':
        return (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="text-lg font-medium text-green-900 mb-3">Geocoding Results</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-green-800">Coordinates:</p>
                <p className="text-sm text-green-700">
                  {results.data.coordinates.latitude}, {results.data.coordinates.longitude}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-green-800">Formatted Address:</p>
                <p className="text-sm text-green-700">{results.data.formatted_address}</p>
              </div>
              {results.data.address_components.city && (
                <div>
                  <p className="text-sm font-medium text-green-800">City:</p>
                  <p className="text-sm text-green-700">{results.data.address_components.city}</p>
                </div>
              )}
              {results.data.address_components.district && (
                <div>
                  <p className="text-sm font-medium text-green-800">District:</p>
                  <p className="text-sm text-green-700">{results.data.address_components.district}</p>
                </div>
              )}
            </div>
          </div>
        );

      case 'reverse':
        return (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-lg font-medium text-blue-900 mb-3">Reverse Geocoding Results</h3>
            <div className="space-y-2">
              <div>
                <p className="text-sm font-medium text-blue-800">Address:</p>
                <p className="text-sm text-blue-700">{results.data.address_info.formatted_address}</p>
              </div>
              {results.data.address_info.components.city && (
                <div>
                  <p className="text-sm font-medium text-blue-800">Administrative Details:</p>
                  <p className="text-sm text-blue-700">
                    City: {results.data.address_info.components.city}
                    {results.data.address_info.components.district && `, District: ${results.data.address_info.components.district}`}
                    {results.data.address_info.components.province && `, Province: ${results.data.address_info.components.province}`}
                  </p>
                </div>
              )}
            </div>
          </div>
        );

      case 'amenities':
        return (
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h3 className="text-lg font-medium text-purple-900 mb-3">Nearby Amenities</h3>
            <div className="mb-4">
              <p className="text-sm text-purple-700">
                Found {results.data.summary.total_amenities} amenities in {results.data.summary.categories_found} categories within {results.data.summary.search_radius}m radius
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
              {Object.entries(results.data.amenities).map(([category, places]) => (
                places.length > 0 && (
                  <div key={category} className="bg-white p-3 rounded border">
                    <h4 className="font-medium text-purple-900 mb-2 capitalize">
                      {category.replace('_', ' ')} ({places.length})
                    </h4>
                    <div className="space-y-1">
                      {places.slice(0, 3).map((place, index) => (
                        <div key={index} className="text-xs text-purple-700">
                          <p className="font-medium">{place.name}</p>
                          {place.rating && (
                            <p>Rating: {place.rating} ({place.user_ratings_total} reviews)</p>
                          )}
                        </div>
                      ))}
                      {places.length > 3 && (
                        <p className="text-xs text-purple-600">+{places.length - 3} more...</p>
                      )}
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>
        );

      case 'map':
        return (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Generated Map</h3>
            <div className="space-y-4">
              <div className="text-center">
                <img
                  src={results.data.map_urls.static_map}
                  alt="Generated Map"
                  className="mx-auto border border-gray-300 rounded"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <div style={{ display: 'none' }} className="text-gray-500 p-8">
                  Map could not be loaded. Please check your Google Maps API configuration.
                </div>
              </div>
              <div className="flex space-x-4 justify-center">
                <a
                  href={results.data.map_urls.static_map}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                >
                  View Full Size
                </a>
                <a
                  href={results.data.map_urls.interactive_map}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">Location Intelligence & Mapping</h1>
          <p className="text-gray-600">GPS coordinates, geocoding, amenity discovery, and map generation</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white shadow rounded-lg">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setResults(null);
                    reset();
                  }}
                  className={`${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center`}
                >
                  <Icon className="h-5 w-5 mr-2" />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Form */}
        <div className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {renderForm()}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="spinner mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <MagnifyingGlassIcon className="h-4 w-4 mr-2" />
                    {activeTab === 'geocode' && 'Get Coordinates'}
                    {activeTab === 'reverse' && 'Get Address'}
                    {activeTab === 'amenities' && 'Find Amenities'}
                    {activeTab === 'map' && 'Generate Map'}
                  </div>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Results */}
      {results && (
        <div className="space-y-4">
          {renderResults()}
        </div>
      )}

      {/* Feature Information */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Location Intelligence Features</h2>
        </div>
        <div className="px-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <MapPinIcon className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <h3 className="font-medium text-gray-900">Geocoding</h3>
              <p className="text-sm text-gray-600 mt-1">
                Convert addresses to GPS coordinates with Sri Lankan location bias
              </p>
            </div>
            <div className="text-center">
              <GlobeAltIcon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-medium text-gray-900">Reverse Geocoding</h3>
              <p className="text-sm text-gray-600 mt-1">
                Get detailed address information from GPS coordinates
              </p>
            </div>
            <div className="text-center">
              <BuildingOfficeIcon className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-medium text-gray-900">Amenity Discovery</h3>
              <p className="text-sm text-gray-600 mt-1">
                Find nearby schools, hospitals, banks, and other amenities
              </p>
            </div>
            <div className="text-center">
              <ClipboardDocumentListIcon className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-medium text-gray-900">Map Generation</h3>
              <p className="text-sm text-gray-600 mt-1">
                Generate static maps and interactive Google Maps links
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;