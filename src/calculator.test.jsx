import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import { useState } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { evaluate } from 'mathjs'

const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

const rows = [
	[7, 8, 9],
	[4, 5, 6],
	[1, 2, 3],
	[0]
]

const operations = ['+','-','*','/']

//Me da un error en estas operaciones de suma, etc. Tema de signos me parece

const equalSign = '='


const Calculator = () => {
	const [value, setValue] = useState('')

	const createHandleClick = op => () => setValue(value.concat(op))

	return(
		<section>
			<h1>Calculator</h1>
			<input value={value} readOnly/>
			<div role='grid'>
				{rows.map((row,idx) => (
					<div key={idx} role='row'>
						{
						row.map(number => 
							<button onClick={createHandleClick(number)} key={number}>
								{number}
							</button>)
						}
					</div>
				))}
				{
					operations.map(operation => <button onClick={createHandleClick(operation)} key={operation}>{operation}</button>)
				}
				<button onClick={() => setValue(evaluate(value))}>{equalSign}</button>
			</div>

		</section>
	)
}

describe('Calculator', () => {

	afterEach(cleanup)

	it('should render', () => {
		render(<Calculator />)
	})

	it('should render title correctly', () => {
		render(<Calculator/>)

		screen.getByText('Calculator')
	})

	it('should render numbers',() => {
		render(<Calculator/>)

		numbers.forEach(number => {
			screen.getByText(number)
		})
	})

	it('should render 4 rows', () => {
		render(<Calculator/>)

		const rows = screen.getAllByRole('row')
		expect(rows.length).toBe(4)
	})

	it('should render operations',() => {
		render(<Calculator/>)

		operations.forEach(operation => {
			screen.getByText(operation)
		})
	})

	it('should render aqual sign', () => {
		render(<Calculator/>)
		screen.getByText('=')
	})

	it('shoueld render an input', () => {
		render(<Calculator/>)
		screen.getByRole('textbox')
	})

	it('should user input after clicking a number', () => {
		render(<Calculator/>)

		const one = screen.getByText('1')
		fireEvent.click(one)

		const input = screen.getByRole('textbox')
		expect(input.value).toBe('1')
	})

	it('should user input after clicking several numbers', () => {
		render(<Calculator/>)

		const one = screen.getByText('1')
		fireEvent.click(one)

		const two = screen.getByText('2')
		fireEvent.click(two)

		const three = screen.getByText('3')
		fireEvent.click(three)

		const input = screen.getByRole('textbox')
		expect(input.value).toBe('123')
	})

	it('should show user input after clicking numbers and operations', () => {
		render(<Calculator/>)

		const one = screen.getByText('1')
		fireEvent.click(one)

		const plus = screen.getByText('+')
		fireEvent.click(plus)
		fireEvent.click(one)

		const input = screen.getByRole('textbox')
		expect(input.value).toBe('1+1')
	})

	it('should calculate based on user input and show the calculation', () => {
		render(<Calculator/>)

		const one = screen.getByText('1')
		fireEvent.click(one)

		const plus = screen.getByText('+')
		fireEvent.click(plus)

		fireEvent.click(one)

		const equal = screen.getByText(equalSign)
		fireEvent.click(equal)

		const input = screen.getByRole('textbox')
		expect(input.value).toBe('2')
	})
})