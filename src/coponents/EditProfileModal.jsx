import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
// import { Button } from '../components/ui/button';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';

export default function EditProfileModal({ isOpen, onClose, profile, onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    location: '',
    website: '',
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name,
        bio: profile.bio,
        location: profile.location,
        website: profile.website,
      });
    }
  }, [profile]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...profile, ...formData });
  };

  const handleChange = (field) => (e) =>
    setFormData((f) => ({ ...f, [field]: e.target.value }));

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Banner & Avatar */}
          <div className="relative">
            <div className="h-32 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg overflow-hidden">
              <img src={profile.banner} alt="Profile banner" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-8 left-4">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-16 h-16 rounded-full border-4 border-white bg-white"
              />
            </div>
          </div>

          {/* Fields */}
          <div className="pt-8 space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={handleChange('name')}
                placeholder="Your name"
                maxLength={50}
              />
              <div className="text-xs text-gray-500 mt-1">
                {50 - formData.name.length} characters remaining
              </div>
            </div>

            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={handleChange('bio')}
                placeholder="Tell us about yourself"
                rows={3}
                maxLength={160}
              />
              <div className="text-xs text-gray-500 mt-1">
                {160 - formData.bio.length} characters remaining
              </div>
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={handleChange('location')}
                placeholder="Where are you located?"
                maxLength={30}
              />
            </div>

            <div>
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                type="url"
                value={formData.website}
                onChange={handleChange('website')}
                placeholder="https://your-website.com"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white">
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
