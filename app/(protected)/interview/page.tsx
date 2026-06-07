type Props = {
  params: Promise<{
    roomCode: string;
  }>;
};

export default async function InterviewPage({
  params,
}: Props) {
  const { roomCode } = await params;

  return (
    <div className="p-10">
      Interview Room:
      {roomCode}
    </div>
  );
}