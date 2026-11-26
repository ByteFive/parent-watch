import api from "./api";

export interface ChildSummary {
  id: string;
  firstName: string;
  lastName: string;
}

export async function getChildren() {
  const { data } = await api.get<{ children: ChildSummary[] }>("/family/children");
  return data.children;
}

export async function linkChild(familyCode: string) {
  const { data } = await api.post<{
    message: string;
    child: ChildSummary;
  }>("/family/children", { familyCode: familyCode.trim().toUpperCase() });
  return data;
}
