export const ButtonVariant = {
  Primary: "primary",
  Secondary: "secondary",
  Outline: "outline",
  Danger: "danger",
} as const;

export type ButtonVariant =
  (typeof ButtonVariant)[keyof typeof ButtonVariant];