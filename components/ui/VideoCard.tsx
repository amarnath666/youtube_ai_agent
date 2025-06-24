// import React, { useState } from 'react';
// import { Play, ExternalLink, Clock, Eye, User, Calendar } from 'lucide-react';

// // Video information interface
// interface VideoInfo {
//   title: string;
//   channel: string;
//   viewCount: number;
//   thumbnail?: string;
//   duration?: string;
//   publishedAt?: string;
//   url: string;
// }

// // Props for the video card component
// interface VideoCardProps {
//   videoInfo: VideoInfo;
//   transcript?: string;
//   wordCount?: number;
//   characterCount?: number;
// }
//           </div>
//           {videoInfo.duration && (
//             <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
//               {videoInfo.duration}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Video Information */}
//       <div className="p-4">
//         <h3 className="font-semibold text-lg text-gray-900 line-clamp-2 mb-2">
//           {videoInfo.title}
//         </h3>
        
//         <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
//           <div className="flex items-center gap-1">
//             <User className="w-4 h-4" />
//             <span>{videoInfo.channel}</span>
//           </div>
//           <div className="flex items-center gap-1">
//             <Eye className="w-4 h-4" />
//             <span>{formatViewCount(videoInfo.viewCount)} views</span>
//           </div>
//           {videoInfo.publishedAt && (
//             <div className="flex items-center gap-1">
//               <Calendar className="w-4 h-4" />
//               <span>{videoInfo.publishedAt}</span>
//             </div>
//           )}
//         </div>

//         {/* Stats Row */}
//         {(wordCount || characterCount) && (
//           <div className="flex items-center gap-4 text-sm text-gray-500 mb-3 p-2 bg-gray-50 rounded-lg">
//             {wordCount && (
//               <div className="flex items-center gap-1">
//                 <Clock className="w-4 h-4" />
//                 <span>{wordCount} words</span>
//               </div>
//             )}
//             {characterCount && (
//               <span>{characterCount.toLocaleString()} characters</span>
//             )}
//           </div>
//         )}

//         {/* Action Buttons */}
//         <div className="flex gap-2">
//           <a
//             href={videoInfo.url}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200"
//           >
//             <Play className="w-4 h-4 fill-current" />
//             Watch on YouTube
//           </a>
//           {transcript && (
//             <button
//               onClick={() => setShowTranscript(!showTranscript)}
//               className="px-4 py-2 border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors duration-200"
//             >
//               {showTranscript ? 'Hide' : 'Show'} Transcript
//             </button>
//           )}
//         </div>

//         {/* Transcript Section */}
//         {transcript && showTranscript && (
//           <div className="mt-4 p-4 bg-gray-50 rounded-lg">
//             <h4 className="font-medium text-gray-900 mb-2">Transcript</h4>
//             <div className="text-sm text-gray-700 max-h-60 overflow-y-auto">
//               <p className="whitespace-pre-wrap">{transcript}</p>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }