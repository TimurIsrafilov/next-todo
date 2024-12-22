import axios from "axios";
import { TypeTask } from "@/types/task";
import { base_URL, TODOS } from "@/utils/constants";

export const fetchTasks = async (): Promise<TypeTask[]> =>
  axios.get(`${base_URL}${TODOS}`).then((response) => response.data);
