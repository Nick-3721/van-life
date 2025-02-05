import { React, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

export default function VanDetail() {
  const [van, setVan] = useState({})
  const params = useParams()

  useEffect(() => {
    fetch(`/api/vans/${params.id}`)
    .then(res => res.json())
    .then(data => setVan(data.vans))
      .catch(err => console.log(err))
  }, [params.id])

  return (
    <div className="wrapper">
      <div className="van-detail-container">
        {van ? (
                <div className="van-detail">
                    <img src={van.imageUrl} />
                    <i className={`van-type ${van.type} selected`}>{van.type}</i>
                    <h2>{van.name}</h2>
                    <p className="van-price"><span>${van.price}</span>/day</p>
                    <p>{van.description}</p>
                    <button className="link-button">Rent this van</button>
                    <Link to={`/vans/${parseFloat(van.id)+1}`}>Next Van</Link>
                    <Link to={`/vans/${parseFloat(van.id)-1}`}>Preious Van</Link>
                </div>
            ) : <h2>Loading...</h2>}
      </div>
    </div>
  )
}