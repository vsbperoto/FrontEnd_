import React from 'react';
import { X, Download, AlertCircle, CheckCircle, Loader } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import type { DownloadProgress } from '../services/downloadService';

interface DownloadModalProps {
  isOpen: boolean;
  progress: DownloadProgress | null;
  onClose: () => void;
  onRetry?: () => void;
}

export default function DownloadModal({ isOpen, progress, onClose, onRetry }: DownloadModalProps) {
  const { language, translations } = useLanguage();
  const t = translations[language];

  if (!isOpen || !progress) return null;

  const canClose = progress.status === 'complete' || progress.status === 'error';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
        <div className="bg-gradient-to-r from-[#7c9885] to-[#6a8470] p-6 text-white relative">
          {canClose && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1 hover:bg-white/20 rounded-full transition"
            >
              <X className="w-5 h-5" />
            </button>
          )}
          <div className="flex items-center gap-3">
            {progress.status === 'complete' ? (
              <CheckCircle className="w-8 h-8" />
            ) : progress.status === 'error' ? (
              <AlertCircle className="w-8 h-8" />
            ) : (
              <Download className="w-8 h-8 animate-bounce" />
            )}
            <div>
              <h3 className="text-xl font-medium">
                {progress.status === 'complete'
                  ? t.download.downloadComplete
                  : progress.status === 'error'
                  ? t.download.downloadFailed
                  : t.download.downloading}
              </h3>
              <p className="text-sm text-white/80 mt-1">
                {progress.message}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          {progress.status !== 'complete' && progress.status !== 'error' && (
            <>
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm text-[#2c3831]/60 mb-2">
                  <span>
                    {progress.status === 'processing'
                      ? t.download.preparingZip
                      : t.download.processingImage
                          .replace('{current}', progress.current.toString())
                          .replace('{total}', progress.total.toString())}
                  </span>
                  <span className="font-medium">{progress.percentage}%</span>
                </div>
                <div className="h-2 bg-[#2c3831]/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#7c9885] to-[#6a8470] transition-all duration-300 ease-out"
                    style={{ width: `${progress.percentage}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 text-sm text-[#2c3831]/60">
                <Loader className="w-4 h-4 animate-spin" />
                <span>Please do not close this window...</span>
              </div>
            </>
          )}

          {progress.status === 'complete' && (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-[#2c3831] mb-6">
                Your images have been downloaded successfully!
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-gradient-to-r from-[#7c9885] to-[#6a8470] text-white rounded-lg hover:shadow-lg transition"
              >
                {t.download.close}
              </button>
            </div>
          )}

          {progress.status === 'error' && (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
              <p className="text-[#2c3831] mb-6">
                Something went wrong. Please try again.
              </p>
              <div className="flex gap-3 justify-center">
                {onRetry && (
                  <button
                    onClick={onRetry}
                    className="px-6 py-2 bg-gradient-to-r from-[#7c9885] to-[#6a8470] text-white rounded-lg hover:shadow-lg transition"
                  >
                    {t.download.retry}
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="px-6 py-2 bg-white border border-[#2c3831]/20 text-[#2c3831] rounded-lg hover:border-[#7c9885] transition"
                >
                  {t.download.close}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}