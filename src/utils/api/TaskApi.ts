import { baseUrl } from "../constants";

interface Constructor {
  url: string,
  headers: {[key: string]: string}
}

/**
 * запросы к api
 */

class TaskApi {

  private readonly url: string;
  private readonly headers: {[key: string]: string};

  constructor({ url, headers }: Constructor) {
    this.url = url;
    this.headers = headers
  }

  // регулирует ответ
  private getRequest(res: Response): Promise<any> {
    return res.ok ? res.json() : Promise.reject(res);
  }

  // создание задачи
  public createTask(data: {[key:string]: string}): Promise<Task> {
    return fetch(`${this.url}/api/task`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(data)
    })
    .then((res: Response) => this.getRequest(res))
  }

  // получение всех задач
  public getAllTasks(): Promise<Task[]> {
    return fetch(`${this.url}/api/task`, {
      method: 'GET',
      headers: this.headers,
    })
    .then((res: Response) => this.getRequest(res))
  }

  // редактирование задачи
  public editTask(data: {[key:string]: string}, id: string): Promise<Task> {
    return fetch(`${this.url}/api/task/${id}`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(data)
    })
    .then((res: Response) => this.getRequest(res))
  }

  // удаление задачи
  public deleteTask(id: string): Promise<Task> {
    return fetch(`${this.url}/api/task/${id}`, {
      method: 'DELETE',
      headers: this.headers,
    })
    .then((res: Response) => this.getRequest(res))
  }

}

export const taskApi = new TaskApi({
  url: baseUrl,
  headers: {
    'Content-Type': 'application/json'
  }
});
