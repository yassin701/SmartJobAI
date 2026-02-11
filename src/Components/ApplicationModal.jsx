// ApplicationModal.jsx
import React from "react";

const ApplicationModal = ({ application, onClose }) => {
  if (!application) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Backdrop avec flou */}
      <div 
        className="absolute inset-0 bg-gray-900/20 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal style carte de visite */}
      <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden">
        {/* Header dégradé */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-8">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-white">
                {application.name}
              </h2>
              <p className="text-indigo-100 text-sm mt-1">
                Candidature • {application.domain}
              </p>
            </div>
          </div>
        </div>

        {/* Contenu style carte */}
        <div className="px-6 py-6 bg-gray-50">
          <div className="bg-white rounded-xl p-5 shadow-sm space-y-4">
            {/* Informations de contact */}
            <div className="flex items-center space-x-3 pb-3 border-b border-gray-100">
              <div className="bg-indigo-50 p-2 rounded-lg">
                <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-500">Email</p>
                <p className="text-sm font-medium text-gray-900">{application.email}</p>
              </div>
            </div>

            {/* Compétences */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-5m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Compétences
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {application.skills?.split(',').map((skill, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1.5 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 text-xs rounded-lg border border-indigo-100"
                  >
                    {skill.trim()}
                  </span>
                )) || (
                  <span className="text-sm text-gray-500 italic">Aucune compétence spécifiée</span>
                )}
              </div>
            </div>

            {/* Motivation */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Motivation
                </span>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700 italic border-l-4 border-indigo-400">
                "{application.motivation || application["lettre motivation"] || "Aucune lettre de motivation"}"
              </div>
            </div>

            {/* CV Button */}
            {application.cvUrl && (
              <div className="pt-2">
                <a
                  href={application.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-medium rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-[1.02] shadow-lg shadow-indigo-200"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Télécharger le CV
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-white border-t border-gray-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationModal;