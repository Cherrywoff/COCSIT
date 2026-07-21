// Role Permissions Configuration

const Permissions = {
  // Common Actions
  VIEW_OWN_PROFILE: 'VIEW_OWN_PROFILE',
  EDIT_OWN_PROFILE: 'EDIT_OWN_PROFILE',
  CHANGE_PASSWORD: 'CHANGE_PASSWORD',
  
  // Student specific
  VIEW_OWN_ATTENDANCE: 'VIEW_OWN_ATTENDANCE',
  VIEW_OWN_GRADES: 'VIEW_OWN_GRADES',
  SUBMIT_ASSIGNMENT: 'SUBMIT_ASSIGNMENT',
  VIEW_OWN_FEES: 'VIEW_OWN_FEES',
  DOWNLOAD_APPROVED_MATERIAL: 'DOWNLOAD_APPROVED_MATERIAL',

  // Teacher specific
  MANAGE_ASSIGNED_CLASSES: 'MANAGE_ASSIGNED_CLASSES',
  MARK_ATTENDANCE: 'MARK_ATTENDANCE',
  INPUT_GRADES: 'INPUT_GRADES',
  CREATE_ASSIGNMENT: 'CREATE_ASSIGNMENT',
  GRADE_ASSIGNMENT: 'GRADE_ASSIGNMENT',
  UPLOAD_STUDY_MATERIAL: 'UPLOAD_STUDY_MATERIAL', // Goes to pending status
  DRAFT_DEPARTMENT_NOTICE: 'DRAFT_DEPARTMENT_NOTICE',

  // HOD specific
  VIEW_DEPARTMENT_STATS: 'VIEW_DEPARTMENT_STATS',
  VIEW_FACULTY_WORKLOAD: 'VIEW_FACULTY_WORKLOAD',
  APPROVE_STUDY_MATERIAL: 'APPROVE_STUDY_MATERIAL',
  APPROVE_DEPARTMENT_NOTICE: 'APPROVE_DEPARTMENT_NOTICE',

  // Principal specific
  VIEW_COLLEGE_STATS: 'VIEW_COLLEGE_STATS',
  VIEW_ALL_STUDENTS: 'VIEW_ALL_STUDENTS',
  VIEW_ALL_FACULTY: 'VIEW_ALL_FACULTY',
  EXPORT_REPORTS: 'EXPORT_REPORTS',

  // Website Admin specific
  MANAGE_WEBSITE_CONTENT: 'MANAGE_WEBSITE_CONTENT',
  MANAGE_MEDIA_LIBRARY: 'MANAGE_MEDIA_LIBRARY',
  MANAGE_USERS: 'MANAGE_USERS',
  ACCESS_RECYCLE_BIN: 'ACCESS_RECYCLE_BIN',
  MANAGE_GLOBAL_SETTINGS: 'MANAGE_GLOBAL_SETTINGS',
};

const RolePermissions = {
  student: [
    Permissions.VIEW_OWN_PROFILE,
    Permissions.EDIT_OWN_PROFILE,
    Permissions.CHANGE_PASSWORD,
    Permissions.VIEW_OWN_ATTENDANCE,
    Permissions.VIEW_OWN_GRADES,
    Permissions.SUBMIT_ASSIGNMENT,
    Permissions.VIEW_OWN_FEES,
    Permissions.DOWNLOAD_APPROVED_MATERIAL
  ],
  teacher: [
    Permissions.VIEW_OWN_PROFILE,
    Permissions.EDIT_OWN_PROFILE,
    Permissions.CHANGE_PASSWORD,
    Permissions.MANAGE_ASSIGNED_CLASSES,
    Permissions.MARK_ATTENDANCE,
    Permissions.INPUT_GRADES,
    Permissions.CREATE_ASSIGNMENT,
    Permissions.GRADE_ASSIGNMENT,
    Permissions.UPLOAD_STUDY_MATERIAL,
    Permissions.DRAFT_DEPARTMENT_NOTICE,
    Permissions.EXPORT_REPORTS // limited to assigned classes
  ],
  hod: [
    Permissions.VIEW_OWN_PROFILE,
    Permissions.EDIT_OWN_PROFILE,
    Permissions.CHANGE_PASSWORD,
    Permissions.VIEW_DEPARTMENT_STATS,
    Permissions.VIEW_FACULTY_WORKLOAD,
    Permissions.APPROVE_STUDY_MATERIAL,
    Permissions.APPROVE_DEPARTMENT_NOTICE,
    Permissions.EXPORT_REPORTS // limited to dept
  ],
  principal: [
    Permissions.VIEW_OWN_PROFILE,
    Permissions.EDIT_OWN_PROFILE,
    Permissions.CHANGE_PASSWORD,
    Permissions.VIEW_COLLEGE_STATS,
    Permissions.VIEW_ALL_STUDENTS,
    Permissions.VIEW_ALL_FACULTY,
    Permissions.EXPORT_REPORTS
  ],
  admin: [
    Permissions.VIEW_OWN_PROFILE,
    Permissions.EDIT_OWN_PROFILE,
    Permissions.CHANGE_PASSWORD,
    Permissions.MANAGE_WEBSITE_CONTENT,
    Permissions.MANAGE_MEDIA_LIBRARY,
    Permissions.MANAGE_USERS,
    Permissions.ACCESS_RECYCLE_BIN,
    Permissions.MANAGE_GLOBAL_SETTINGS,
    Permissions.EXPORT_REPORTS // CMS stats
  ]
};

// Utility function for components to check permissions
export const hasPermission = (userRole, permission) => {
  if (!RolePermissions[userRole]) return false;
  return RolePermissions[userRole].includes(permission);
};

export default Permissions;
