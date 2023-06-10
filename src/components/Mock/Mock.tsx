//THIS IS AN EXAMPLE FETCH AND DISPLAY COMPONENT FOR EXPRESS MOCK DATA.
//You can use npm run startmock to start both the express and the react server at the same time
/*import React from 'react';
import { useState, useEffect } from 'react';
interface Task {
  key: string;
  description: string;
  type: string;
  oldPoints: number;
  remainingPoints: number;
  newPoints: number;
}

function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  useEffect(() => {
    fetch('/task')
      .then((response) => response.json())
      .then((mockdata: Task[]) => setTasks(mockdata));
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      {tasks.map((task) => (
        <div key={task.key}>
          <h2>{task.key}</h2>
          <p>{task.description}</p>
          <p>{task.type}</p>
          <p>{task.oldPoints}</p>
          <p>{task.remainingPoints}</p>
          <p>{task.newPoints}</p>
        </div>
      ))}
    </div>
  );
}

export default TaskList;*/
export {}; // delete this if trying the example
