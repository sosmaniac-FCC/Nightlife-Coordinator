import React from 'react';

export default function(props) {
    return (
        <div className="footer-copyright" style={{
            position: "fixed",
            width: "100%",
            left: "0",
            bottom: "0",
            backgroundColor: "black",
            opacity: "0.8",
            color: "white",
            textAlign: "center",
            zIndex: "1" }}>
            Made with <a className="orange-text text-lighten-3" href="http://materializecss.com" target="_blank">Materialize</a> and the <a className="red-text text-lighten-3" href="https://www.yelp.com/developers" target="_blank">Yelp API</a>
        </div>
    );
}