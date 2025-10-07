             </div>
                  </div>
                  {gallery.welcome_message && (
                    <div className="boho-card rounded-boho p-6">
                      <h3 className="text-xl font-semibold text-boho-brown mb-3 boho-heading">
                        Welcome Message
                      </h3>
                      <p className="text-boho-rust">{gallery.welcome_message}</p>
                    </div>
                  )}

                  {gallery.admin_notes && (
                    <div className="boho-card rounded-boho p-6">
                      <h3 className="text-xl font-semibold text-boho-brown mb-3 boho-heading">
                        Admin Notes
                      </h3>
                      <p className="text-boho-rust">{gallery.admin_notes}</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'analytics' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="boho-card rounded-boho p-6">
                      <h3 className="text-lg font-semibold text-boho-brown mb-4 boho-heading flex items-center space-x-2">
                        <Activity className="w-5 h-5" />
                        <span>Engagement Metrics</span>
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-boho-rust">Views</span>
                            <span className="text-boho-brown font-bold">{stats?.totalViews || 0}</span>
                          </div>
                          <div className="w-full h-2 bg-boho-warm bg-opacity-20 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-500"
                              style={{ width: `${Math.min(100, ((stats?.totalViews || 0) / 100) * 100)}%` }}
                            />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-boho-rust">Downloads</span>
                            <span className="text-boho-brown font-bold">{stats?.totalDownloads || 0}</span>
                          </div>
                          <div className="w-full h-2 bg-boho-warm bg-opacity-20 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-purple-500"
                              style={{ width: `${Math.min(100, ((stats?.totalDownloads || 0) / 50) * 100)}%` }}
                            />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-boho-rust">Favorites</span>
                            <span className="text-boho-brown font-bold">{stats?.totalFavorites || 0}</span>
                          </div>
                          <div className="w-full h-2 bg-boho-warm bg-opacity-20 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-red-500"
                              style={{ width: `${Math.min(100, ((stats?.totalFavorites || 0) / gallery.images.length) * 100)}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="boho-card rounded-boho p-6">
                      <h3 className="text-lg font-semibold text-boho-brown mb-4 boho-heading">
                        Quick Stats
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center py-2 border-b border-boho-brown border-opacity-10">
                          <span className="text-boho-rust">Avg. Views per Visitor</span>
                          <span className="text-boho-brown font-bold">
                            {stats?.uniqueVisitors ? ((stats.totalViews / stats.uniqueVisitors).toFixed(1)) : '0'}
                          </span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-boho-brown border-opacity-10">
                          <span className="text-boho-rust">Downloads per Image</span>
                          <span className="text-boho-brown font-bold">
                            {gallery.images.length ? ((stats?.totalDownloads || 0) / gallery.images.length).toFixed(2) : '0'}
                          </span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                          <span className="text-boho-rust">Favorite Rate</span>
                          <span className="text-boho-brown font-bold">
                            {gallery.images.length ? (((stats?.totalFavorites || 0) / gallery.images.length) * 100).toFixed(1) : '0'}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'images' && (
                <div className="space-y-6">
                  {selectedImages.size > 0 && (
                    <div className="flex items-center justify-between p-4 bg-boho-sage bg-opacity-10 rounded-boho border border-boho-sage border-opacity-30">
                      <span className="text-boho-brown font-medium">
                        {selectedImages.size} image{selectedImages.size !== 1 ? 's' : ''} selected
                      </span>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={handleRemoveImages}
                          className="px-4 py-2 bg-red-100 text-red-700 rounded-boho hover:bg-red-200 transition-all flex items-center space-x-2"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Remove Selected</span>
                        </button>
                        <button
                          onClick={() => setSelectedImages(new Set())}
                          className="px-4 py-2 bg-boho-sage bg-opacity-20 text-boho-brown rounded-boho hover:bg-opacity-30 transition-all"
                        >
                          Clear Selection
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                    {gallery.images.map((imageId) => (
                      <div
                        key={imageId}
                        onClick={() => toggleImageSelection(imageId)}
                        className={`aspect-square rounded-boho overflow-hidden border-2 cursor-pointer transition-all ${
                          selectedImages.has(imageId)
                            ? 'border-boho-sage ring-2 ring-boho-sage ring-offset-2'
                            : 'border-boho-brown border-opacity-20 hover:border-opacity-40'
                        }`}
                      >
                        <img
                          src={cloudinaryService.getOptimizedUrl(imageId, {
                            width: 150,
                            height: 150,
                            crop: 'fill',
                            quality: 'auto'
                          })}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <div className="boho-card rounded-boho p-6">
                    <h3 className="text-lg font-semibold text-boho-brown mb-4">Gallery Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between py-3 border-b border-boho-brown border-opacity-10">
                        <div>
                          <p className="font-medium text-boho-brown">Allow Downloads</p>
                          <p className="text-sm text-boho-rust">Clients can download images</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={gallery.allow_downloads}
                          readOnly
                          className="w-5 h-5 text-boho-sage border-boho-brown rounded focus:ring-boho-sage"
                        />
                      </div>

                      <div className="flex items-center justify-between py-3 border-b border-boho-brown border-opacity-10">
                        <div>
                          <p className="font-medium text-boho-brown">Status</p>
                          <p className="text-sm text-boho-rust">Current gallery status</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          gallery.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {gallery.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};