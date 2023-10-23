import React, { useState } from 'react'

export default function Counter() {
	const [count, setCount] = useState(0)

	const increment = () => {
		setCount(count +1)
	}

	return (
		<div className="card">
		<button onClick={increment}>
			count is {count}
		</button>
		<p>
			Edit <code>src/App.jsx</code> and save to test HMR
		</p>
	</div>
	)
}
