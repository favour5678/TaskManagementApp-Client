'use client'

import { useState } from 'react';
import CreatedTasks from './CreatedTasks'

export default function HomePage() {
  const [tasks, setTasks] = useState([]);
  const [tasksValue, setTasksValue] = useState('')

  const handleCreateTask = () => {
    if (tasksValue.trim() !== '') {
      setTasks(prevTasks => [...prevTasks, tasksValue])
      setTasksValue('')
    }
  }
  
  return (
    <section>
        <h1 className="text-center text-xl pt-5">Task Management Application(T.M.A)</h1>
        <div className='ml-10 mt-10 space-y-2'>
            <input type="text" value={tasksValue} onChange={e => setTasksValue(e.target.value)} className='border outline-none px-3 border-green-900 h-10 w-[30%]' placeholder='Input task here'/>
            <div className='font-semibold text-lg'>
                <button className='bg-green-300 p-2 rounded-md' onClick={handleCreateTask}>Create Task</button>
            </div>
        </div>
        <div className='border border-green-900 mt-10 mx-10'></div>
        
        <CreatedTasks tasks={tasks}/>
    </section>
  )
}
