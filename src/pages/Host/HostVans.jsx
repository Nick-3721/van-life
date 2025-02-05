import { React, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function HostVans() {
  const [hostsVans, setHostsVans] =useState([])

  useEffect(() => {
    fetch('/api/host/vans')
    .then(res => res.json())
    .then(data => setHostsVans(data.vans))
    .catch(err => console.log(err))
  }, [])
  console.log(hostsVans)

  const hostVansList = hostsVans.map(van => (
    <Link
      to={`/host/vans/${van.id}`}
      key={van.id}
      className='host-van-link-wrapper'
    >
      <div key={van.id} className="host-van-single">
        <img src={van.imageUrl} alt={`Photo of ${van.name}`} />
        <div className="host-van-info">
            <h3>{van.name}</h3>
            <p>${van.price}/day</p>
        </div>
      </div>
    </Link>
  ))

  return (
    <section>
      <h1 className="host-vans-title">Your listed vans</h1>
      <div className="host-vans-list">
        {hostVansList.length > 0 ? (
          <section>
            {hostVansList}
          </section>
       ):(
          <h2>Loading...</h2>
        ) }
      </div>
    </section>
  )
}
