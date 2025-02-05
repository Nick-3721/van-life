import { React, useState, useEffect } from "react"
import { Link } from "react-router-dom" 


export default function Home() {
    const [vanData, setVanData] = useState([])

    useEffect(() => {
        fetch('/api/vans')
        .then(res => res.json())
        .then(data => setVanData(data.vans))
        .catch(err => console.log(err))
    }, [])
    console.log(vanData)
    
    const vanElements = vanData.map(van => (
        <div key={van.id} className="van-tile">
            <Link 
            to={`/vans/${van.id}`} 
            aria-label={`view detail for ${van.name},
                        priced at ${van.price} per day`}
            >
                <img src={van.imageUrl} />
                <div className="van-info">
                    <h3>{van.name}</h3>
                    <p>${van.price}<span>/day</span></p>
                </div>
                <i className={`van-type ${van.type} selected`}>{van.type}</i>
            </Link>
        </div>
    ))

    return (
        <div className="wrapper">
            <div className="van-list-container">
                <h1>Explore our van options</h1>
                <div className="van-list">
                    {vanElements}
                </div>
            </div>
        </div>
    )
};