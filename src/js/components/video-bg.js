export function videoBgInit() {
	const video = document.querySelector('.video-bg__video')
	if (!video) return

	video.playbackRate = 0.6
}
