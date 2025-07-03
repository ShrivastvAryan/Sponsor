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
  Image,
  Mail
} from 'lucide-react';

export default function BusinessForm() {
  const [formData, setFormData] = useState({
    name: '',
    category1: '',
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

  const showToast = (message, type = 'success') => {
    const toastDiv = document.createElement('div');
    toastDiv.className = `fixed top-4 right-4 p-4 rounded-lg text-white z-50 ${
      type === 'success' ? 'bg-green-500' : 'bg-red-500'
    }`;
    toastDiv.textContent = message;
    document.body.appendChild(toastDiv);
    
    setTimeout(() => {
      document.body.removeChild(toastDiv);
    }, 5000);
  };

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
    
    // Clear error when user starts typing
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
      
      // Clear logo error
      setErrors(prev => ({...prev, logo: ''}));
    }
  };

  const removeLogo = () => {
    setLogoFile(null);
    setLogoPreview(null);
    const fileInput = document.getElementById('logo-upload');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Fix: Check name instead of name
    if (!formData.name.trim()) {
      newErrors.name = 'Business name is required';
    }
    
    if (!formData.category1) {
      newErrors.category1 = 'category is required';
    }
    
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\+?[\d\s\-\(\)]+$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const form = new FormData();

        form.append('name', formData.name);
        form.append('category1', formData.category1);
        form.append('phoneNumber', formData.phoneNumber);
        
        if (logoFile) {
          form.append('logo', logoFile);
        }

    
        form.append('facebook', formData.socialMedia.facebook);
        form.append('twitter', formData.socialMedia.twitter);
        form.append('instagram', formData.socialMedia.instagram);

        const res = await fetch('http://localhost:4000/addsponsor', {
          method: 'POST',
          body: form,
        });

        const data = await res.json();

        if (res.ok) {
          console.log('Server Response:', data);
          showToast('Sponsor Submitted Successfully', 'success');
          
          setFormData({
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
          setLogoFile(null);
          setLogoPreview(null);
          setErrors({});
        } else {
          console.error('Error submitting:', data);
          showToast(`Error: ${data.error || 'Failed to submit sponsor'}`, 'error');
        }
      } catch (err) {
        console.error('Submission error:', err);
        showToast(`Error: ${err.message || 'Failed to submit sponsor'}`, 'error');
      }
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
            {/* Business Name Field */}
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

            {/* Primary Category */}
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

            {/* Phone Number */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Phone className="w-4 h-4 mr-2" />
                Phone Number 
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
                Contact Details
              </h3>
              
              {/* Email */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Mail className="w-4 h-4 mr-2" />
                
                  E-Mail
                </label>
                <input
                  type="url"
                  name="social_facebook"
                  value={formData.socialMedia.facebook}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.social_facebook ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                 
                />
              </div>

              {/* Twitter */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                
                  Contact-1
                </label>
                <input
                  type="url"
                  name="social_twitter"
                  value={formData.socialMedia.twitter}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.social_twitter ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  
                />
               
              </div>

              {/* Instagram */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  
                  Contact-2
                </label>
                <input
                  type="url"
                  name="social_instagram"
                  value={formData.socialMedia.instagram}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.social_instagram ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  
                />
               
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center"
                onClick={handleSubmit}
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