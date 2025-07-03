import { useState, useEffect } from 'react';
import { 
  Trash2, 
  ExternalLink, 
  Facebook, 
  Twitter, 
  Instagram,
  Phone,
  Tag,
  Building,
  AlertCircle,
  Loader2,
  RefreshCw
} from 'lucide-react';

export default function AllSponsors() {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(null);

  const showToast = (message, type = 'success') => {
    const toastDiv = document.createElement('div');
    toastDiv.className = `fixed top-4 right-4 p-4 rounded-lg text-white z-50 transition-all duration-300 ${
      type === 'success' ? 'bg-green-500' : 'bg-red-500'
    }`;
    toastDiv.textContent = message;
    document.body.appendChild(toastDiv);
    
    setTimeout(() => {
      toastDiv.style.opacity = '0';
      setTimeout(() => {
        if (document.body.contains(toastDiv)) {
          document.body.removeChild(toastDiv);
        }
      }, 300);
    }, 3000);
  };

  const fetchSponsors = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:4000/allsponsor');
      
      if (!response.ok) {
        throw new Error('Failed to fetch sponsors');
      }
      
      const data = await response.json();
      setSponsors(data.sponsors || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching sponsors:', err);
      setError('Failed to load sponsors. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (sponsorId) => {
    if (!window.confirm('Are you sure you want to delete this sponsor?')) {
      return;
    }

    try {
      setDeleteLoading(sponsorId);
      
      const response = await fetch(`http://localhost:4000/removesponsor`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete sponsor');
      }

      // Remove sponsor from local state
      setSponsors(prevSponsors => 
        prevSponsors.filter(sponsor => sponsor.id !== sponsorId)
      );
      
      showToast('Sponsor deleted successfully', 'success');
    } catch (err) {
      console.error('Error deleting sponsor:', err);
      showToast('Failed to delete sponsor. Please try again.', 'error');
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleRefresh = () => {
    fetchSponsors();
  };

  useEffect(() => {
    fetchSponsors();
  }, []);

  const getSocialIcon = (platform) => {
    switch (platform) {
      case 'facebook':
        return <Facebook className="w-4 h-4 text-blue-600" />;
      case 'twitter':
        return <Twitter className="w-4 h-4 text-blue-400" />;
      case 'instagram':
        return <Instagram className="w-4 h-4 text-pink-500" />;
      default:
        return <ExternalLink className="w-4 h-4 text-gray-600" />;
    }
  };

  const getSocialLinks = (sponsor) => {
    const links = [];
    if (sponsor.link1) links.push({ url: sponsor.link1, platform: 'facebook' });
    if (sponsor.link2) links.push({ url: sponsor.link2, platform: 'twitter' });
    if (sponsor.link3) links.push({ url: sponsor.link3, platform: 'instagram' });
    return links;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading sponsors...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center bg-white rounded-xl shadow-lg p-8 max-w-md mx-4">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={handleRefresh}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center mx-auto"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">All Sponsors</h1>
          <p className="text-gray-600 text-lg">Manage your sponsor directory</p>
          <div className="flex justify-center mt-4">
            <button
              onClick={handleRefresh}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </button>
          </div>
        </div>

        {/* Sponsors Count */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Building className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {sponsors.length} Sponsors
                </h2>
                <p className="text-gray-600">Total registered sponsors</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sponsors Grid */}
        {sponsors.length === 0 ? (
          <div className="text-center bg-white rounded-xl shadow-lg p-12">
            <Building className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No Sponsors Found</h3>
            <p className="text-gray-600">No sponsors have been added yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sponsors.map((sponsor) => (
              <div
                key={sponsor.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {/* Logo Section */}
                <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  {sponsor.logo_url ? (
                    <img
                      src={sponsor.logo_url}
                      alt={`${sponsor.company_name} logo`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center">
                      <Building className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500 text-sm">No Logo</p>
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="p-6">
                  {/* Company Name */}
                  <h3 className="text-xl font-bold text-gray-800 mb-2 truncate">
                    {sponsor.company_name}
                  </h3>

                  {/* Category */}
                  <div className="flex items-center mb-3">
                    <Tag className="w-4 h-4 text-blue-600 mr-2" />
                    <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {sponsor.category}
                    </span>
                  </div>

                  {/* Phone Number */}
                  {sponsor.phoneNumber && (
                    <div className="flex items-center mb-3">
                      <Phone className="w-4 h-4 text-gray-600 mr-2" />
                      <span className="text-sm text-gray-700">{sponsor.phoneNumber}</span>
                    </div>
                  )}

                  {/* Social Links */}
                  <div className="mb-4">
                    <div className="flex items-center mb-2">
                      <ExternalLink className="w-4 h-4 text-gray-600 mr-2" />
                      <span className="text-sm font-medium text-gray-700">Social Links</span>
                    </div>
                    <div className="flex space-x-2">
                      {getSocialLinks(sponsor).map((link, index) => (
                        <a
                          key={index}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                          title={`Visit ${link.platform}`}
                        >
                          {getSocialIcon(link.platform)}
                        </a>
                      ))}
                      {getSocialLinks(sponsor).length === 0 && (
                        <span className="text-xs text-gray-500">No social links available</span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end pt-4 border-t border-gray-200">
                    <button
                      onClick={() => handleDelete(sponsor.id)}
                      disabled={deleteLoading === sponsor.id}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center"
                    >
                      {deleteLoading === sponsor.id ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4 mr-2" />
                      )}
                      {deleteLoading === sponsor.id ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}