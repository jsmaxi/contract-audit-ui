const Stats = () => {
  // Mock for now
  const CONTRACTS = 512;
  const CRITICAL = 68;
  const HIGH = 245;
  const MEDIUM = 455;
  const LOW = 890;

  return (
    <div className="mt-12 p-6 bg-glass-card backdrop-blur-sm rounded-lg">
      <h3 className="text-2xl font-orbitron font-bold text-white mb-6">
        Platform Statistics
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="p-4 bg-background/50 rounded-lg text-center">
          <p className="text-2xl font-bold text-white">{CONTRACTS}</p>
          <p className="text-sm text-gray-400">Contracts Audited</p>
        </div>
        <div className="p-4 bg-background/50 rounded-lg text-center">
          <p className="text-2xl font-bold text-red-500">{CRITICAL}</p>
          <p className="text-sm text-gray-400">Critical Issues</p>
        </div>
        <div className="p-4 bg-background/50 rounded-lg text-center">
          <p className="text-2xl font-bold text-orange-500">{HIGH}</p>
          <p className="text-sm text-gray-400">High Issues</p>
        </div>
        <div className="p-4 bg-background/50 rounded-lg text-center">
          <p className="text-2xl font-bold text-yellow-500">{MEDIUM}</p>
          <p className="text-sm text-gray-400">Medium Issues</p>
        </div>
        <div className="p-4 bg-background/50 rounded-lg text-center">
          <p className="text-2xl font-bold text-blue-500">{LOW}</p>
          <p className="text-sm text-gray-400">Low Issues</p>
        </div>
      </div>
    </div>
  );
};

export default Stats;
