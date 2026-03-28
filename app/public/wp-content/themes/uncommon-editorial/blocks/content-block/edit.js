import { Button, PanelBody, SelectControl, TextControl } from '@wordpress/components';
import { InspectorControls, useBlockProps, RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

const Edit = ( { attributes, setAttributes } ) => {
	const { heading, body, items, theme } = attributes;
	const blockProps = useBlockProps( { className: 'content-block ' + theme } );

	const updateItem = ( index, value ) => {
		const newItems = [ ...items ];
		newItems[ index ] = value;
		setAttributes( { items: newItems } );
	};

	const addItem = () => setAttributes( { items: [ ...items, '' ] } );

	const removeItem = ( index ) => {
		const newItems = [ ...items ];
		newItems.splice( index, 1 );
		setAttributes( { items: newItems } );
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Content Block Settings', 'uncommon-editorial' ) } initialOpen={ true }>
					<SelectControl
						label={ __( 'Theme', 'uncommon-editorial' ) }
						value={ theme }
						options={ [
							{ label: __( 'Theme 1', 'uncommon-editorial' ), value: 'theme-1' },
							{ label: __( 'Theme 2', 'uncommon-editorial' ), value: 'theme-2' },
						] }
						onChange={ ( value ) => setAttributes( { theme: value } ) }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<RichText
					tagName="h2"
					className="content-block__heading"
					value={ heading }
					onChange={ ( value ) => setAttributes( { heading: value } ) }
					placeholder={ __( 'e.g. What we do', 'uncommon-editorial' ) }
					allowedFormats={ [] }
					disableLineBreaks
				/>

				<RichText
					tagName="div"
					className="content-block__body"
					value={ body }
					onChange={ ( value ) => setAttributes( { body: value } ) }
					placeholder={ __( 'Enter body text...', 'uncommon-editorial' ) }
				/>

				<div style={ { marginTop: '16px' } }>
					<div>
						<strong>{ __( 'Services', 'uncommon-editorial' ) }</strong>
					</div>
					{ items.map( ( item, i ) => (
						<div key={ i } style={ { display: 'flex', gap: '8px', marginTop: '8px' } }>
							<TextControl
								value={ item }
								onChange={ ( value ) => updateItem( i, value ) }
								placeholder={ __( 'e.g. Magazines and books', 'uncommon-editorial' ) }
							/>
							<Button variant="secondary" onClick={ () => removeItem( i ) }>
								{ __( 'Remove', 'uncommon-editorial' ) }
							</Button>
						</div>
					) ) }
					<Button variant="primary" onClick={ addItem } style={ { marginTop: '12px' } }>
						{ __( 'Add service', 'uncommon-editorial' ) }
					</Button>
				</div>
			</div>
		</>
	);
};

export default Edit;
