
import React from 'react';
import { useMiniPlayer } from '@/contexts/MiniPlayerContext';
import { Button } from '@/components/ui/button';
import { Music, ExternalLink, Search, ListMusic, User, Settings, Keyboard } from 'lucide-react';

const Index = () => {
  const { showMiniPlayer } = useMiniPlayer();

  return (
    <div className="min-h-screen flex flex-col bg-songhunt-darkest text-songhunt-text">
      {/* Header */}
      <header className="bg-songhunt-dark border-b border-gray-800 p-3">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-xl font-bold">
              <span className="text-songhunt-red">Song</span>
              <span className="text-white">hunt</span>
            </h1>
          </div>
          <div className="flex items-center space-x-6">
            <NavItem icon={<Search size={18} />} label="Search" active={false} />
            <NavItem icon={<ListMusic size={18} />} label="Playlists" active={true} />
            <NavItem icon={<User size={18} />} label="Profile" active={false} />
            <NavItem icon={<Settings size={18} />} label="Settings" active={false} />
            <NavItem icon={<Keyboard size={18} />} label="Hotkeys" active={false} />
          </div>
          <div>
            <Button className="bg-songhunt-red hover:bg-red-600 text-white text-xs py-1 px-3 rounded">
              Premium Member
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex">
        {/* Left Sidebar */}
        <div className="w-52 bg-songhunt-dark border-r border-gray-800 p-4">
          <h2 className="font-semibold mb-3">Playlists</h2>
          <div className="space-y-1">
            <PlaylistItem name="Top" active={true} />
            <PlaylistItem name="Fresh Start" active={false} />
            <PlaylistItem name="Hustle" active={false} />
            <PlaylistItem name="Cold Vibe" active={false} />
            <PlaylistItem name="Featured" active={false} />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-songhunt-dark p-8 rounded-lg text-center">
              <div className="mb-6">
                <Music size={48} className="mx-auto text-songhunt-red" />
              </div>
              <h1 className="text-3xl font-bold mb-4">Songhunt Music Player</h1>
              <p className="text-gray-400 mb-8">
                Open the mini-player overlay to control your music while gaming
              </p>
              <Button 
                onClick={showMiniPlayer}
                className="bg-songhunt-red hover:bg-red-600 text-white py-5 px-8 rounded-md flex items-center space-x-2 mx-auto"
              >
                <span>Launch Mini Player</span>
                <ExternalLink size={16} />
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Player Bar */}
      <footer className="bg-songhunt-dark border-t border-gray-800 p-3">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-gray-700 rounded overflow-hidden">
              <img 
                src="/lovable-uploads/aa317b98-2fe5-4cce-8d97-acce21086903.png" 
                alt="Song cover" 
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <div className="text-sm font-medium">Iron</div>
              <div className="text-xs text-gray-400">Woodkid</div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="text-xs text-gray-500">36% - Chill gaming vibes</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const NavItem = ({ icon, label, active }: { icon: React.ReactNode, label: string, active: boolean }) => (
  <div className={`flex flex-col items-center ${active ? 'text-white' : 'text-gray-500'}`}>
    <div className="mb-1">{icon}</div>
    <span className="text-xs">{label}</span>
  </div>
);

const PlaylistItem = ({ name, active }: { name: string, active: boolean }) => (
  <div className={`px-2 py-1 rounded ${active ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-300'}`}>
    {name}
  </div>
);

export default Index;
