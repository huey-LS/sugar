import React from 'react';

export default function Html (props) {
  return (
    <html>
      <header>
        <title>{props.title}</title>
      </header>
      <body>
        <div id="application">
          {
            React.cloneElement(
              React.Children.only(props.children),
              { ...props.initializeData }
            )
          }
        </div>
        <script dangerouslySetInnerHTML={{__html: `window.__initialize_data__ = ${JSON.stringify(props.initializeData)}`}}></script>
        <script src={props.script}></script>
      </body>
    </html>
  );
}
