import React, { useState } from 'react'
import ReactPlayer from 'react-player'

export default function Player() {

  const [search, setSearch] = useState()

  return (
    <div>
      <input
        type="text"
        placeholder="Input video URL here"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ReactPlayer url={search} controls={true} />
    </div>
  )
}