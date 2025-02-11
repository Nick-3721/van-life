import { React, useState, useEffect } from "react"
import { Link, useSearchParams } from "react-router-dom" 


export default function Home() {
    const [searchParams, setSearchParams ] = useSearchParams()
    const [vanData, setVanData] = useState([])

    let typeFilter = searchParams.get("type")
    
    useEffect(() => {
        fetch('/api/vans')
        .then(res => res.json())
        .then(data => setVanData(data.vans))
        .catch(err => console.log(err))
    }, [])
    
    const displayVans = typeFilter
        ? vanData.filter(van => van.type === typeFilter)
        : vanData

    console.log(displayVans)
    
    const vanElements = displayVans.map(van => (
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
                <div className="van-list-filter-buttons">
                    <Link to="?type=simple" className="van-type simple">Simple</Link>
                    <Link to="?type=rugged" className="van-type rugged">Rugged</Link>
                    <Link to="?type=luxury" className="van-type luxury">Luxury</Link>
                    <Link to="." className="van-type clear-filters">Clear Filter</Link>
            
                </div>
                <div className="van-list">
                    {vanElements}
                </div>
            </div>
        </div>
    )
};