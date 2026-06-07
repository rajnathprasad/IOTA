type Props = {
  params: Promise<{
    roomCode: string;
  }>;
};

export default async function InterviewRoomPage({
  params,
}: Props) {
  const { roomCode } = await params;

  return (
    <div className="p-6">
      <h1>Interview Room</h1>

      <p>Room Code: {roomCode}</p>
    </div>
  );
}