document.querySelectorAll( '.testimonials' ).forEach( ( testimonials ) => {
	const runner = testimonials.querySelector( '.testimonials__runner' );
	const track  = testimonials.querySelector( '.testimonials__scrollbar' );
	const thumb  = testimonials.querySelector( '.testimonials__scrollbar-thumb' );

	if ( ! runner || ! track || ! thumb ) return;

	const updateThumb = () => {
		const ratio = runner.clientWidth / runner.scrollWidth;

		if ( ratio >= 1 ) {
			track.parentElement.style.visibility = 'hidden';
			return;
		}

		track.parentElement.style.visibility = '';

		const thumbWidth    = ratio * track.clientWidth;
		const maxScrollLeft = runner.scrollWidth - runner.clientWidth;
		const scrollRatio   = maxScrollLeft > 0 ? runner.scrollLeft / maxScrollLeft : 0;
		const maxThumbLeft  = track.clientWidth - thumbWidth;

		thumb.style.width = thumbWidth + 'px';
		thumb.style.left  = scrollRatio * maxThumbLeft + 'px';
	};

	runner.addEventListener( 'scroll', updateThumb );
	window.addEventListener( 'resize', updateThumb );
	updateThumb();

	// Drag thumb
	let isDragging    = false;
	let startX        = 0;
	let startScrollLeft = 0;

	thumb.addEventListener( 'mousedown', ( e ) => {
		isDragging      = true;
		startX          = e.clientX;
		startScrollLeft = runner.scrollLeft;
		e.preventDefault();
	} );

	document.addEventListener( 'mousemove', ( e ) => {
		if ( ! isDragging ) return;
		const dx           = e.clientX - startX;
		const maxScrollLeft = runner.scrollWidth - runner.clientWidth;
		const maxThumbLeft  = track.clientWidth - thumb.offsetWidth;
		if ( maxThumbLeft <= 0 ) return;
		runner.scrollLeft = startScrollLeft + ( dx / maxThumbLeft ) * maxScrollLeft;
	} );

	document.addEventListener( 'mouseup', () => {
		isDragging = false;
	} );

	// Click on track
	track.addEventListener( 'click', ( e ) => {
		if ( e.target === thumb ) return;
		const rect        = track.getBoundingClientRect();
		const clickRatio  = ( e.clientX - rect.left ) / rect.width;
		runner.scrollLeft = clickRatio * ( runner.scrollWidth - runner.clientWidth );
	} );
} );
