# react-list-section

> Made with create-react-library

[![NPM](https://img.shields.io/npm/v/react-list-section.svg)](https://www.npmjs.com/package/react-list-section) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-list-section
```

## Usage

```tsx
import React from 'react'


import 'react-list-sectionlist/dist/index.css'

import React from "react";
import SectionList from "react-list-section";

// Hero Feature Content Carousel

const Home = () => {
  return (
    <>
      <SectionList
        sections={[{ data: [{ id: 5 }], title: "abcd" }]}
        renderSectionHeader={(a) => <div>{a.title}</div>}
        renderItem={(el) => <div>{el.id}</div>}
      />
    </>
  );
};

export default Home;

```

## License

MIT © [yunusyavuz16](https://github.com/yunusyavuz16)
