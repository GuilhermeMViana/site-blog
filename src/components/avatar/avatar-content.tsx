type AvatarContentProps = {
  children: React.ReactNode;
};

export const AvatarContent = ({ children }: AvatarContentProps) => {
  return <div className="flex flex-col items-left gap-3">{children}</div>;
};
