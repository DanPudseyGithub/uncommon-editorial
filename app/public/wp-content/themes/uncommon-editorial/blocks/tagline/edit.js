import { TextControl, Button, PanelBody } from '@wordpress/components';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

export default function Edit({ attributes, setAttributes }) {
    const { intro = '', words = [] } = attributes;
    const blockProps = useBlockProps();

    const updateWord = (index, value) => {
        const newWords = [...words];
        newWords[index] = value;
        setAttributes({ words: newWords });
    };

    const addWord = () => setAttributes({ words: [...words, ''] });
    const removeWord = (index) => {
        const newWords = [...words];
        newWords.splice(index, 1);
        setAttributes({ words: newWords });
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Tagline Settings', 'uncommon-editorial')} initialOpen={true}>
                    <TextControl
                        label={__('Intro text', 'uncommon-editorial')}
                        value={intro}
                        onChange={(value) => setAttributes({ intro: value })}
                    />
                    <div style={{ marginTop: '16px' }}>
                        <strong>{__('Words', 'uncommon-editorial')}</strong>
                        {words.map((word, i) => (
                            <div key={i} style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                                <TextControl
                                    value={word}
                                    onChange={(value) => updateWord(i, value)}
                                    placeholder={__('Enter a word', 'uncommon-editorial')}
                                />
                                <Button variant="secondary" onClick={() => removeWord(i)}>
                                    {__('Remove', 'uncommon-editorial')}
                                </Button>
                            </div>
                        ))}
                        <Button variant="primary" onClick={addWord} style={{ marginTop: '12px' }}>
                            {__('Add Word', 'uncommon-editorial')}
                        </Button>
                    </div>
                </PanelBody>
            </InspectorControls>
            <div {...blockProps}>
                <strong>{intro}</strong> {words[0] && <em>{words[0]}</em>}
            </div>
        </>
    );
}