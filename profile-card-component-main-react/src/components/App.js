import React from 'react';
import Card from './Card';

function App() {
  return (
    <div>
      <Card
        image="/image-victor.jpg"
        name="Victor Crest"
        age="26"
        location="London"
        followers="80K"
        likes="803K"
        photos="1.4K"
      ></Card>
    </div>
  );
}

export default App;
