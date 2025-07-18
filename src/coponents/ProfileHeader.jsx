import React from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LinkIcon from '@mui/icons-material/Link';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { Button } from '../components/ui/button';

export default function ProfileHeader({ profile, onEditProfile }) {
    const fmt = (n) => (n >= 1000 ? (n / 1000).toFixed(1) + 'K' : n);
    const profileData = {
        userName : profile.name,
        email : profile.email,
        banner: profile.banner,
        avatar : profile.image,
        bio : profile.bio,
        location : profile.location,
        website: profile.website,
        joinedDate: "10/01/2005",
        following: 10,
        followers: 10,
    }

    return (
        <div className="relative">
            <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500 overflow-hidden">
                <img src={profileData.banner} alt="Banner" className="w-full h-full object-cover" />
            </div>

            <div className="relative px-6 pb-6">
                <div className="flex justify-between items-start -mt-16 mb-4">
                    <img
                        src={profileData.avatar}
                        alt={profileData.name}
                        className="w-32 h-32 rounded-full border-4 border-white bg-white"
                    />
                    <Button
                        onClick={onEditProfile}
                        variant="outline"
                        className="mt-16 bg-white hover:bg-gray-50 font-medium px-6"
                    >
                        Edit Profile
                    </Button>
                </div>

                <h1 className="text-2xl font-bold text-gray-900">{profile.name}</h1>
                <p className="text-gray-500 mb-4">@{profileData.userName}</p>
                <p className="text-gray-900 mb-4 leading-relaxed">{profileData.bio}</p>

                <div className="flex flex-wrap gap-4 mb-4 text-gray-500 text-sm">
                    {profileData.location && (
                        <div className="flex items-center gap-1">
                            <LocationOnIcon fontSize="small" />
                            <span>{profileData.location}</span>
                        </div>
                    )}
                    {profileData.website && (
                        <div className="flex items-center gap-1">
                            <LinkIcon size={16} />{' '}
                            <a href={profileData.website} target="_blank" rel="noreferrer" className="hover:underline">
                                {profileData.website.replace(/^https?:\/\//, '')}
                            </a>
                        </div>
                    )}
                    <div className="flex items-center gap-1">
                        <CalendarTodayIcon fontSize="small" />
                        <span>Joined {profileData.joinedDate}</span>
                    </div>
                </div>

                <div className="flex gap-6 text-sm">
                    <span className="font-bold text-gray-900">{fmt(profileData.following)}</span>
                    <span className="text-gray-500">Following</span>
                    <span className="font-bold text-gray-900">{fmt(profileData.followers)}</span>
                    <span className="text-gray-500">Followers</span>
                </div>
            </div>
        </div>
    );
}
