import React, { useState, useEffect } from "react";

const  ShowBox = ({
                     title,
                     release_date,
                     characters,
                     opening_crawl,
                     setLoading,
                 }) => {
    const [modal, setModal] = useState(false);

    const [currentActors] = useState([]);

    const modalOnOff = () => setModal(!modal);

    if (
        modal
            ? document.body.classList.add("active-modal")
            : document.body.classList.remove("active-modal")
    );

    useEffect(() => {
        setLoading(true);

        Promise.all(
            characters.map((actor) =>
                fetch(actor)
                    .then((response) => response.json())
                    .then((responseBody) => {
                        currentActors.push(responseBody);
                        currentActors.sort((a, b) => a.name.localeCompare(b.name));
                    })
            )
        );

        setLoading(false);
    }, []); // Loading the page, get info once

    return (
        <div>
            {!modal && (
                <div className="thumb-container" onClick={modalOnOff}>
                    <h3>{title}</h3>

                    <h4>{release_date}</h4>
                </div>
            )}
            {modal && (
                <div className="thumb-container overlay" onClick={modalOnOff}>
                    <h1>{title}</h1>
                    <h3>{release_date}</h3>
                    <h6 className="crawl-container">{opening_crawl}</h6>

                    <ol className="actorBox">
                        <h2>Actors:</h2>
                        {currentActors.map((item, index) => (
                            <li key={index}>{item.name}</li>
                        ))}
                    </ol>
                </div>
            )}
        </div>
    );
};

export default ShowBox;