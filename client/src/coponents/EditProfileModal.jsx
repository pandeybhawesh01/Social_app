import React, { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Camera, Upload } from 'lucide-react';
import { uploadImageFrontend } from '../lib/cloudinary';

export default function EditProfileModal({ isOpen, onClose, profile, onSave }) {
  const [avatarFile, setAvatarFile] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);

  const [formData, setFormData] = useState({
    name: '', bio: '', location: '', website: '',
  });
  const [previews, setPreviews] = useState({
    avatar: '', banner: ''
  });

  const avatarRef = useRef();
  const bannerRef = useRef();

  useEffect(() => {
    if (!profile) return;
    setFormData({
      name: profile.name || '',
      bio: profile.bio || '',
      location: profile.location || '',
      website: profile.website || ''
    });
    setPreviews({
      avatar: profile.image || '',
      banner: profile.banner || ''
    });
    setAvatarFile(null);
    setBannerFile(null);
  }, [profile]);

  const onFieldChange = key => e =>
    setFormData(fd => ({ ...fd, [key]: e.target.value }));

  const onFileSelect = type => e => {
  const file = e.target.files[0];
  if (!file) return;

  // create the FileReader
  const reader = new FileReader();

  // once loaded, update preview
  reader.addEventListener('load', evt => {
    setPreviews(prev => ({ ...prev, [type]: evt.target.result }));
  }, { once: true });

  // kick off the read
  reader.readAsDataURL(file);

  // store the raw file object
  if (type === 'avatar') setAvatarFile(file);
  else                    setBannerFile(file);
};

  const trigger = type => {
    if (type==='avatar') avatarRef.current.click();
    else                 bannerRef.current.click();
  };

  const handleSubmit = async e => {
    e.preventDefault();
    // call parent onSave with fields + raw files
        let avatarUrl = profile.image;
    let bannerUrl = profile.banner;

    if (avatarFile) {
      const { secure_url } = await uploadImageFrontend(avatarFile);
      avatarUrl = secure_url;
    }
    if (bannerFile) {
      const { secure_url } = await uploadImageFrontend(bannerFile);
      bannerUrl = secure_url;
    }
    await onSave({
      ...formData,
      image :  avatarUrl,
      banner: bannerUrl,
    });
    onClose();
  };

  // const trigger = type => {
  //   if (type === 'avatar') avatarRef.current.click();
  //   else bannerRef.current.click();
  // };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Banner */}
          <div className="relative group">
            <div className="h-32 rounded-lg overflow-hidden bg-gray-200">
              {previews.banner
                ? <img src={previews.banner} className="w-full h-full object-cover" />
                : <div className="w-full h-full flex items-center justify-center">
                    <Camera className="w-8 h-8 text-gray-400" />
                  </div>}
            </div>
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition">
              <Button
                type="button"
                variant="ghost"
                onClick={() => trigger('banner')}
              >
                <Upload className="mr-2 w-4 h-4" /> Change Banner
              </Button>
            </div>
            <input
              ref={bannerRef}
              type="file"
              accept="image/*"
              onChange={onFileSelect('banner')}
              className="hidden"
            />
          </div>

          {/* Avatar */}
          <div className="relative w-max group" style={{ marginTop: '-2rem' }}>
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white bg-gray-100">
              {previews.avatar
                ? <img src={previews.avatar} className="w-full h-full object-cover" />
                : <div className="w-full h-full flex items-center justify-center">
                    <Camera className="w-6 h-6 text-gray-400" />
                  </div>}
            </div>
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition rounded-full">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => trigger('avatar')}
              >
                <Camera className="w-4 h-4 text-white" />
              </Button>
            </div>
            <input
              ref={avatarRef}
              type="file"
              accept="image/*"
              onChange={onFileSelect('avatar')}
              className="hidden"
            />
          </div>

          {/* Text fields */}
          <div className="space-y-4 pt-6">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={onFieldChange('name')}
                maxLength={50}
              />
            </div>
            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={onFieldChange('bio')}
                rows={3}
                maxLength={160}
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={onFieldChange('location')}
              />
            </div>
            <div>
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                type="url"
                value={formData.website}
                onChange={onFieldChange('website')}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// import React, { useState, useEffect, useRef } from 'react';
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
// import { Button } from '../components/ui/button';
// import { Input } from '../components/ui/input';
// import { Textarea } from '../components/ui/textarea';
// import { Label } from '../components/ui/label';
// import { Camera, Upload } from 'lucide-react';

// export default function EditProfileModal({ isOpen, onClose, profile, onSave }) {
//   const [formData, setFormData] = useState({
//     name: '',
//     bio: '',
//     location: '',
//     website: '',
//     banner: '',
//     avatar: '',
//   });

//   const [previewImages, setPreviewImages] = useState({
//     banner: '',
//     avatar: '',
//   });

//   const bannerInputRef = useRef(null);
//   const avatarInputRef = useRef(null);

//   useEffect(() => {
//     if (profile) {
//       setFormData({
//         name: profile.name || '',
//         bio: profile.bio || '',
//         location: profile.location || '',
//         website: profile.website || '',
//         banner: profile.banner || '',
//         avatar: profile.avatar || '',
//       });
//       setPreviewImages({
//         banner: profile.banner || '',
//         avatar: profile.avatar || '',
//       });
//     }
//   }, [profile]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSave({ 
//       ...profile, 
//       ...formData,
//       banner: previewImages.banner,
//       avatar: previewImages.avatar,
//     });
//   };

//   const handleChange = (field) => (e) =>
//     setFormData((f) => ({ ...f, [field]: e.target.value }));

//   const handleImageUpload = (type) => (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         const imageUrl = e.target.result;
//         setPreviewImages(prev => ({ ...prev, [type]: imageUrl }));
//         setFormData(prev => ({ ...prev, [type]: imageUrl }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const triggerImageUpload = (type) => {
//     if (type === 'banner') {
//       bannerInputRef.current?.click();
//     } else {
//       avatarInputRef.current?.click();
//     }
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
//         <DialogHeader>
//           <DialogTitle>Edit Profile</DialogTitle>
//         </DialogHeader>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Banner & Avatar */}
//           <div className="relative">
//             {/* Banner */}
//             <div className="relative group">
//               <div className="h-32 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg overflow-hidden">
//                 {previewImages.banner ? (
//                   <img 
//                     src={previewImages.banner} 
//                     alt="Profile banner" 
//                     className="w-full h-full object-cover" 
//                   />
//                 ) : (
//                   <div className="w-full h-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
//                     <Camera className="w-8 h-8 text-white/70" />
//                   </div>
//                 )}
//               </div>
              
//               {/* Banner Upload Button */}
//               <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
//                 <Button
//                   type="button"
//                   variant="secondary"
//                   size="sm"
//                   onClick={() => triggerImageUpload('banner')}
//                   className="bg-white/20 hover:bg-white/30 text-white border-white/30"
//                 >
//                   <Upload className="w-4 h-4 mr-2" />
//                   Change Banner
//                 </Button>
//               </div>
              
//               <input
//                 ref={bannerInputRef}
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageUpload('banner')}
//                 className="hidden"
//               />
//             </div>

//             {/* Avatar */}
//             <div className="absolute -bottom-8 left-4">
//               <div className="relative group">
//                 <div className="w-16 h-16 rounded-full border-4 border-white bg-white overflow-hidden">
//                   {previewImages.avatar ? (
//                     <img
//                       src={previewImages.avatar}
//                       alt={formData.name}
//                       className="w-full h-full object-cover"
//                     />
//                   ) : (
//                     <div className="w-full h-full bg-gray-200 flex items-center justify-center">
//                       <Camera className="w-6 h-6 text-gray-400" />
//                     </div>
//                   )}
//                 </div>
                
//                 {/* Avatar Upload Button */}
//                 <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-full flex items-center justify-center">
//                   <Button
//                     type="button"
//                     variant="ghost"
//                     size="sm"
//                     onClick={() => triggerImageUpload('avatar')}
//                     className="p-1 h-auto bg-white/20 hover:bg-white/30 text-white rounded-full"
//                   >
//                     <Camera className="w-4 h-4" />
//                   </Button>
//                 </div>
                
//                 <input
//                   ref={avatarInputRef}
//                   type="file"
//                   accept="image/*"
//                   onChange={handleImageUpload('avatar')}
//                   className="hidden"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Fields */}
//           <div className="pt-8 space-y-4">
//             <div>
//               <Label htmlFor="name">Name</Label>
//               <Input
//                 id="name"
//                 value={formData.name}
//                 onChange={handleChange('name')}
//                 placeholder="Your name"
//                 maxLength={50}
//               />
//               <div className="text-xs text-gray-500 mt-1">
//                 {50 - formData.name.length} characters remaining
//               </div>
//             </div>

//             <div>
//               <Label htmlFor="bio">Bio</Label>
//               <Textarea
//                 id="bio"
//                 value={formData.bio}
//                 onChange={handleChange('bio')}
//                 placeholder="Tell us about yourself"
//                 rows={3}
//                 maxLength={160}
//               />
//               <div className="text-xs text-gray-500 mt-1">
//                 {160 - formData.bio.length} characters remaining
//               </div>
//             </div>

//             <div>
//               <Label htmlFor="location">Location</Label>
//               <Input
//                 id="location"
//                 value={formData.location}
//                 onChange={handleChange('location')}
//                 placeholder="Where are you located?"
//                 maxLength={30}
//               />
//             </div>

//             <div>
//               <Label htmlFor="website">Website</Label>
//               <Input
//                 id="website"
//                 type="url"
//                 value={formData.website}
//                 onChange={handleChange('website')}
//                 placeholder="https://your-website.com"
//               />
//             </div>
//           </div>

//           <div className="flex justify-end gap-3 pt-4">
//             <Button type="button" variant="outline" onClick={onClose}>
//               Cancel
//             </Button>
//             <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white">
//               Save Changes
//             </Button>
//           </div>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }


