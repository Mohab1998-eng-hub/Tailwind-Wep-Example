'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function Blog() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-4xl font-semibold text-gray-900 mb-12">Users</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {users.map((user) => (
            <div key={user.id} className="border p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold">{user.name}</h3>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-gray-600">{user.phone}</p>
              <p className="text-gray-600">{user.website}</p>

              <div className="mt-4 h-48 w-full">
                <MapContainer
                  center={[user.address.geo.lat, user.address.geo.lng]}
                  zoom={13}
                  scrollWheelZoom={false}
                  className="h-full w-full rounded-md"
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  />
                  <Marker
                    position={[user.address.geo.lat, user.address.geo.lng]}
                  >
                    <Popup>{user.name}</Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
