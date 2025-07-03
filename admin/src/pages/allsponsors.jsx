import React, { useEffect, useState } from 'react';
import { Trash2, ExternalLink, Globe, Phone, Tag, AlertCircle, Loader2, Search, Filter } from 'lucide-react';

const AllSponsors = () => {
    const [sponsors, setAllSponsors] = useState([]);
    const [filteredSponsors, setFilteredSponsors] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deletingId, setDeletingId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchSponsors();
    }, []);

    useEffect(() => {
        filterSponsors();
    }, [sponsors, searchTerm, selectedCategory]);

    const fetchSponsors = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await fetch('http://localhost:4000/allsponsor');
            
            if (response.ok) {
                const data = await response.json();
                setAllSponsors(data);
                
                // Extract unique categories
                const uniqueCategories = [...new Set(data.map(sponsor => sponsor.category).filter(Boolean))];
                setCategories(uniqueCategories);
            } else {
                throw new Error('Failed to fetch sponsors');
            }
        } catch (error) {
            console.error('Error fetching sponsors:', error);
            setError('Failed to load sponsors. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const filterSponsors = () => {
        let filtered = sponsors;

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(sponsor =>
                sponsor.company_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                sponsor.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                sponsor.phoneNumber?.includes(searchTerm)
            );
        }

        // Filter by category
        if (selectedCategory) {
            filtered = filtered.filter(sponsor => sponsor.category === selectedCategory);
        }

        setFilteredSponsors(filtered);
    };

    const handleRemove = async (id) => {
        if (!window.confirm('Are you sure you want to remove this sponsor?')) {
            return;
        }

        try {
            setDeletingId(id);
            const response = await fetch('http://localhost:4000/removesponsor', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: id })
            });

            if (response.ok) {
                // Remove the sponsor from the local state
                setAllSponsors(prev => prev.filter(sponsor => sponsor.id !== id));
                
                // Show success toast (you can implement this with your preferred toast library)
                console.log('Sponsor removed successfully');
            } else {
                throw new Error('Failed to remove sponsor');
            }
        } catch (error) {
            console.error('Error removing sponsor:', error);
            alert('Failed to remove sponsor. Please try again.');
        } finally {
            setDeletingId(null);
        }
    };

    const renderLink = (link, label) => {
        if (!link) return null;
        
        return (
            <a 
                href={link.startsWith('http') ? link : `https://${link}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm transition-colors duration-200"
            >
                <ExternalLink size={14} />
                {label}
            </a>
        );
    };

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedCategory('');
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
                    <p className="text-gray-600 text-lg">Loading sponsors...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                <div className="text-center bg-white p-8 rounded-lg shadow-md max-w-md">
                    <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Something went wrong</h2>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <button 
                        onClick={fetchSponsors}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                            All Sponsors
                        </h1>
                        <p className="text-lg text-gray-600">
                            Manage and view all your sponsors in one place
                        </p>
                        <div className="mt-4 flex justify-center">
                            <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                                {filteredSponsors.length} of {sponsors.length} {sponsors.length === 1 ? 'Sponsor' : 'Sponsors'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search and Filter Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                        {/* Search Input */}
                        <div className="relative flex-1 w-full md:w-auto">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search by company name, category, or phone..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                        </div>

                        {/* Category Filter */}
                        <div className="relative w-full md:w-auto">
                            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full md:w-48 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
                            >
                                <option value="">All Categories</option>
                                {categories.map(category => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Clear Filters Button */}
                        {(searchTerm || selectedCategory) && (
                            <button
                                onClick={clearFilters}
                                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 whitespace-nowrap"
                            >
                                Clear Filters
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
                {filteredSponsors.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto">
                            <Globe className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                {sponsors.length === 0 ? 'No sponsors found' : 'No matching sponsors'}
                            </h3>
                            <p className="text-gray-600">
                                {sponsors.length === 0 
                                    ? 'There are no sponsors to display at the moment.' 
                                    : 'Try adjusting your search or filter criteria.'}
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredSponsors.map((sponsor) => (
                            <div 
                                key={sponsor.id || Math.random()} 
                                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden flex flex-col"
                            >
                                {/* Image Section */}
                                <div className="h-48 bg-white flex items-center justify-center text-white">
                                    {sponsor.logo_url ? (
                                        <img 
                                            src={sponsor.logo_url} 
                                            alt={sponsor.company_name || 'Sponsor'} 
                                            className="w-full h-full object-contain"
                                        />
                                    ) : (
                                        <div className="text-center">
                                            <Globe className="w-16 h-16 mx-auto mb-2 opacity-80 text-gray-400" />
                                            <p className="text-lg font-medium text-gray-400">No Image</p>
                                        </div>
                                    )}
                                </div>

                                {/* Content Section - Flex grow to push button to bottom */}
                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="flex-grow">
                                        <div className="mb-4">
                                            <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                                                {sponsor.company_name || 'Unnamed Sponsor'}
                                            </h3>
                                            
                                            {sponsor.category && (
                                                <div className="flex items-center gap-1 mb-3">
                                                    <Tag className="w-4 h-4 text-gray-500" />
                                                    <span className="text-sm bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                                                        {sponsor.category}
                                                    </span>
                                                </div>
                                            )}

                                            {sponsor.phoneNumber && (
                                                <div className="flex items-center gap-2 mb-3">
                                                    <Phone className="w-4 h-4 text-gray-500" />
                                                    <span className="text-sm text-gray-700">{sponsor.phoneNumber}</span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="space-y-2 mb-4">
                                            {renderLink(sponsor.link1, 'Link1')}
                                            {renderLink(sponsor.link2, 'Link2')}
                                            {renderLink(sponsor.link3, 'Link3')}
                                        </div>
                                    </div>

                                    {/* Remove Button - Always at bottom */}
                                    <button
                                        onClick={() => handleRemove(sponsor.id)}
                                        disabled={deletingId === sponsor.id}
                                        className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 mt-auto ${
                                            deletingId === sponsor.id
                                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                : 'bg-red-500 text-white hover:bg-red-600 hover:shadow-md'
                                        }`}
                                    >
                                        {deletingId === sponsor.id ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                Removing...
                                            </>
                                        ) : (
                                            <>
                                                <Trash2 className="w-4 h-4" />
                                                Remove
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllSponsors;