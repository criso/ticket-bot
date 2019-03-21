import React from 'react';
import MultipleChoice from '../MultipleChoice';

const option = (value) => ({
  value,
  label: value
});

const FontSelector = () => (
  <MultipleChoice
    style={{
      display: 'flex',
      marginTop: 20
    }}
    options={[
      option('VT323'),
      option('Bangers'),
      option('Lobster'),
      option('Space Mono'),
      option('Special Elite'),
      option('Rokkit')
    ]}
    onSelect={({ value }) => {
      document.body.style.fontFamily = value;
    }}
  />
);

export default FontSelector;
