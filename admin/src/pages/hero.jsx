import { useState } from 'react';
import { 
  Upload, 
  X, 
  Facebook, 
  Twitter, 
  Instagram, 
  Save,
  User,
  Phone,
  Tag,
  Link,
  Image
} from 'lucide-react';

export default function BusinessForm() {
  const [formData, setFormData] = useState({
    name: '',
    category1: '',
    category2: '',
    phoneNumber: '',
    socialMedia: {
      facebook: '',
      twitter: '',
      instagram: ''
    }
  });
  
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [errors, setErrors] = useState({});

  const categories = [
    'Restaurant',
    'Technology',
    'Healthcare',
    'Education',
    'Retail',
    'Finance',
    'Real Estate',
    'Entertainment',
    'Sports',
    'Travel',
    'Fashion',
    'Automotive',
    'Construction',
    'Legal',
    'Marketing',
    'Other'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('social_')) {
      const socialPlatform = name.split('_')[1];
      setFormData(prev => ({
        ...prev,
        socialMedia: {
          ...prev.socialMedia,
          [socialPlatform]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
  
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { 
        setErrors(prev => ({...prev, logo: 'File size must be less than 5MB'}));
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({...prev, logo: 'Please upload an image file'}));
        return;
      }

      setLogoFile(file);
  
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoPreview(e.target.result);
      };
      reader.readAsDataURL(file);
      
  
      setErrors(prev => ({...prev, logo: ''}));
    }
  };

  const removeLogo = () => {
    setLogoFile(null);
    setLogoPreview(null);
    document.getElementById('logo-upload').value = '';
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.category1) {
      newErrors.category1 = 'Category 1 is required';
    }
    
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\+?[\d\s\-\(\)]+$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }

    const urlPattern = /^https?:\/\/.+/;
    Object.entries(formData.socialMedia).forEach(([platform, url]) => {
      if (url && !urlPattern.test(url)) {
        newErrors[`social_${platform}`] = 'Please enter a valid URL (starting with http:// or https://)';
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Form is valid, process submission
      console.log('Form Data:', formData);
      console.log('Logo File:', logoFile);
      
      // Here you would typically send the data to your backend
      alert('Form submitted successfully!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Business Information</h1>
            <p className="text-gray-600">Please fill out all the required fields</p>
          </div>

          <div className="space-y-6">
            {/* Name Field */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 mr-2" />
                Business Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="Enter your business name"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Category 1 */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Tag className="w-4 h-4 mr-2" />
                Primary Category *
              </label>
              <select
                name="category1"
                value={formData.category1}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  errors.category1 ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
              >
                <option value="">Select primary category</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              {errors.category1 && <p className="text-red-500 text-sm mt-1">{errors.category1}</p>}
            </div>

            {/* Logo Upload */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Image className="w-4 h-4 mr-2" />
                Logo Upload
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors duration-200">
                {logoPreview ? (
                  <div className="relative inline-block">
                    <img 
                      src={logoPreview} 
                      alt="Logo preview" 
                      className="w-32 h-32 object-cover rounded-lg mx-auto"
                    />
                    <button
                      type="button"
                      onClick={removeLogo}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div>
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
                    <p className="text-sm text-gray-500">PNG, JPG, GIF up to 5MB</p>
                  </div>
                )}
                <input
                  id="logo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
                <label
                  htmlFor="logo-upload"
                  className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 cursor-pointer transition-colors duration-200"
                >
                  {logoPreview ? 'Change Logo' : 'Choose File'}
                </label>
              </div>
              {errors.logo && <p className="text-red-500 text-sm mt-1">{errors.logo}</p>}
            </div>

            {/* Category 2 */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Tag className="w-4 h-4 mr-2" />
                Secondary Category
              </label>
              <select
                name="category2"
                value={formData.category2}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                <option value="">Select secondary category (optional)</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Phone Number */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Phone className="w-4 h-4 mr-2" />
                Phone Number *
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  errors.phoneNumber ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="+1 (555) 123-4567"
              />
              {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
            </div>

            {/* Social Media Links */}
            <div className="space-y-4">
              <h3 className="flex items-center text-lg font-medium text-gray-800">
                <Link className="w-5 h-5 mr-2" />
                Social Media Links
              </h3>
              
              {/* Facebook */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Facebook className="w-4 h-4 mr-2 text-blue-600" />
                  Facebook
                </label>
                <input
                  type="url"
                  name="social_facebook"
                  value={formData.socialMedia.facebook}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.social_facebook ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="https://facebook.com/yourpage"
                />
                {errors.social_facebook && <p className="text-red-500 text-sm mt-1">{errors.social_facebook}</p>}
              </div>

              {/* Twitter */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Twitter className="w-4 h-4 mr-2 text-blue-400" />
                  Twitter
                </label>
                <input
                  type="url"
                  name="social_twitter"
                  value={formData.socialMedia.twitter}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.social_twitter ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="https://twitter.com/youraccount"
                />
                {errors.social_twitter && <p className="text-red-500 text-sm mt-1">{errors.social_twitter}</p>}
              </div>

              {/* Instagram */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Instagram className="w-4 h-4 mr-2 text-pink-500" />
                  Instagram
                </label>
                <input
                  type="url"
                  name="social_instagram"
                  value={formData.socialMedia.instagram}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.social_instagram ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="https://instagram.com/youraccount"
                />
                {errors.social_instagram && <p className="text-red-500 text-sm mt-1">{errors.social_instagram}</p>}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center"
              >
                <Save className="w-5 h-5 mr-2" />
                Save Business Information
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}