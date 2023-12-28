'use client'

import YouTube from 'react-youtube'

declare global {
    interface Window {
        YT: any
        onYouTubeIframeAPIReady: any
    }
}

// Utilitaire pour extraire l'ID de la vidéo à partir de l'URL
const extractVideoID = (url: string): string => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : ''
}

// eslint-disable-next-line react/prop-types
const YoutubeAudioPlayer: React.FC<{ url: string }> = ({ url }) => {
    // const [player, setPlayer] = useState<any>(null)
    // const playerContainerRef = useRef<HTMLDivElement>(null)

    const videoId = extractVideoID(url) // Extrait l'ID de la vidéo à partir de l'URL

    if (!videoId) {
        // console.error('URL YouTube invalide.')
        return
    }

    const options = {
        height: '10',
        width: '10',
        videoId: videoId,
        playerVars: {
            autoplay: 0 // Empêche la lecture automatique
            // Autres paramètres si nécessaire
        }
    }

    return (
        <YouTube
            videoId={videoId}
            opts={options}
            // onReady={e => setPlayer(e.target)}
            // onStateChange={e => console.log(e)}
        />
    )
}

export default YoutubeAudioPlayer
