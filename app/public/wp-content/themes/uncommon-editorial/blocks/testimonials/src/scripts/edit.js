import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

const ALLOWED_BLOCKS = [ 'uncommon-editorial/testimonial' ];

const Edit = () => {
	const blockProps = useBlockProps( { className: 'testimonials' } );

	return (
		<div { ...blockProps }>
			<div className="testimonials__grid">
				<InnerBlocks
					allowedBlocks={ ALLOWED_BLOCKS }
					renderAppender={ InnerBlocks.ButtonBlockAppender }
				/>
			</div>
		</div>
	);
};

export default Edit;
