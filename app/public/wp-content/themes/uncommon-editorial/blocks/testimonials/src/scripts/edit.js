import { TextControl, PanelBody } from '@wordpress/components';
import { InspectorControls, useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

const ALLOWED_BLOCKS = [ 'uncommon-editorial/testimonial' ];

const Edit = ( { attributes, setAttributes } ) => {
	const { heading } = attributes;
	const blockProps = useBlockProps( { className: 'testimonials' } );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Testimonials Settings', 'uncommon-editorial' ) } initialOpen={ true }>
					<TextControl
						label={ __( 'Section Heading', 'uncommon-editorial' ) }
						value={ heading }
						onChange={ ( value ) => setAttributes( { heading: value } ) }
						placeholder={ __( 'Enter heading…', 'uncommon-editorial' ) }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				{ heading && <h2 className="testimonials__heading">{ heading }</h2> }
				<div className="testimonials__grid">
					<InnerBlocks
						allowedBlocks={ ALLOWED_BLOCKS }
						renderAppender={ InnerBlocks.ButtonBlockAppender }
					/>
				</div>
			</div>
		</>
	);
};

export default Edit;
