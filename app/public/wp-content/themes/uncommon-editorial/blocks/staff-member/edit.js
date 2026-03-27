import { TextControl, Button, PanelBody } from '@wordpress/components';
import { InspectorControls, useBlockProps, RichText, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

const Edit = ( { attributes, setAttributes } ) => {
	const { imageId, imageUrl, imageAlt, name, role, description } = attributes;
	const blockProps = useBlockProps( { className: 'staff-member' } );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Staff Member', 'uncommon-editorial' ) } initialOpen={ true }>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ ( media ) =>
								setAttributes( {
									imageId: media.id,
									imageUrl: media.url,
									imageAlt: media.alt,
								} )
							}
							allowedTypes={ [ 'image' ] }
							value={ imageId }
							render={ ( { open } ) => (
								<div style={ { marginBottom: '16px' } }>
									{ imageUrl ? (
										<>
											<img src={ imageUrl } alt={ imageAlt } style={ { width: '100%', marginBottom: '8px' } } />
											<Button variant="secondary" onClick={ open }>
												{ __( 'Replace Image', 'uncommon-editorial' ) }
											</Button>
										</>
									) : (
										<Button variant="secondary" onClick={ open }>
											{ __( 'Select Image', 'uncommon-editorial' ) }
										</Button>
									) }
								</div>
							) }
						/>
					</MediaUploadCheck>
					<TextControl
						label={ __( 'Name', 'uncommon-editorial' ) }
						value={ name }
						onChange={ ( value ) => setAttributes( { name: value } ) }
						placeholder={ __( 'Full name…', 'uncommon-editorial' ) }
					/>
					<TextControl
						label={ __( 'Role', 'uncommon-editorial' ) }
						value={ role }
						onChange={ ( value ) => setAttributes( { role: value } ) }
						placeholder={ __( 'Job title…', 'uncommon-editorial' ) }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				{ imageUrl && (
					<div className="staff-member__image">
						<img src={ imageUrl } alt={ imageAlt } className="staff-member__photo" />
					</div>
				) }
				<div className="staff-member__info">
					{ name && <h3 className="staff-member__name">{ name }</h3> }
					{ role && <p className="staff-member__role">{ role }</p> }
					<RichText
						tagName="div"
						className="staff-member__description"
						value={ description }
						onChange={ ( value ) => setAttributes( { description: value } ) }
						placeholder={ __( 'Enter description…', 'uncommon-editorial' ) }
					/>
				</div>
			</div>
		</>
	);
};

export default Edit;
