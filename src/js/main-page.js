import '../scss/_main-page.scss';

function initVideo(video) {
	if (!video) return;

	video.muted = true;
	video.playsInline = true;
	video.loop = true;

	const play = () => {
		video.play().catch(() => {});
	};

	play();
	document.addEventListener('visibilitychange', () => {
		if (!document.hidden) play();
	});
}

document.addEventListener('DOMContentLoaded', () => {
	initVideo(document.querySelector('.main-page__hero-video'));
});
