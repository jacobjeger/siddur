/** A row from the siddur_sections table. */
export interface SiddurSectionRow {
  id: number;
  nusach: string;
  path: string;
  section_name: string;
  section_name_he: string | null;
  parent_path: string;
  depth: number;
  display_order: number;
  text_hebrew: string;
  text_english: string | null;
  source: string;
}

/** A node in the siddur hierarchy (branch or leaf). */
export interface SiddurNode {
  path: string;
  name: string;
  nameHe: string | null;
  isLeaf: boolean;
  childCount: number;
}
