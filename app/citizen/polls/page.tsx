"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  X,
  Check,
  Trash2,
  BarChart3,
  User,
  Sun,
  Moon,
  Filter,
} from "lucide-react";
import { useThemeStore } from "@/store/useThemeStore";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"

type Poll = {
  id: number;
  question: string;
  options: string[];
  createdByMe: boolean;
  createdAt: Date;
  votes?: number[];
  category?: string;
  status?: "active" | "closed";
  totalVotes: number;
};

export default function PollsPage() {
  const { theme } = useThemeStore();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"all" | "mine">("all");
  const [showAddPoll, setShowAddPoll] = useState(false);

  // Filters
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const [polls, setPolls] = useState<Poll[]>([
    {
      id: 1,
      question: "Should a new park be built in the constituency?",
      options: ["Yes", "No", "Maybe, with modifications"],
      createdByMe: false,
      createdAt: new Date(Date.now() - 86400000 * 2),
      votes: [45, 30, 25],
      category: "Infrastructure",
      status: "active",
      totalVotes: 100,
    },
    {
      id: 2,
      question: "Which issue should be prioritized in the next quarter?",
      options: [
        "Road Maintenance",
        "Water Supply",
        "Electricity Infrastructure",
        "Public Safety",
      ],
      createdByMe: true,
      createdAt: new Date(Date.now() - 86400000),
      votes: [35, 40, 20, 5],
      category: "Community",
      status: "active",
      totalVotes: 100,
    },
    {
      id: 3,
      question: "Preferred community event for this month",
      options: [
        "Local Farmers Market",
        "Cultural Festival",
        "Sports Tournament",
        "Educational Workshop",
      ],
      createdByMe: false,
      createdAt: new Date(),
      votes: [25, 45, 20, 10],
      category: "Events",
      status: "closed",
      totalVotes: 100,
    },
  ]);

  const [newPoll, setNewPoll] = useState({
    question: "",
    options: ["", ""],
    category: "",
  });

  const [votedPolls, setVotedPolls] = useState<Set<number>>(new Set());

  // Statistics
  const stats = [
    {
      title: "Total Polls",
      value: polls.length.toString(),
      icon: BarChart3,
      description: "All Community Polls",
      color: "bg-blue-500",
    },
    {
      title: "Active Polls",
      value: polls.filter((p) => p.status === "active").length.toString(),
      icon: User,
      description: "Currently Active",
      color: "bg-green-500",
    },
    {
      title: "My Polls",
      value: polls.filter((p) => p.createdByMe).length.toString(),
      icon: User,
      description: "Created by You",
      color: "bg-purple-500",
    },
  ];

  const handleAddOption = () => {
    if (newPoll.options.length < 6) {
      setNewPoll((prev) => ({
        ...prev,
        options: [...prev.options, ""],
      }));
    }
  };

  const handleCreatePoll = () => {
    if (!newPoll.question.trim()) {
      alert("Please enter a poll question.");
      return;
    }

    if (newPoll.options.some((o) => !o.trim())) {
      alert("Please fill in all options.");
      return;
    }

    if (!newPoll.category.trim()) {
      alert("Please select a category.");
      return;
    }

    setPolls((prev) => [
      ...prev,
      {
        id: Date.now(),
        question: newPoll.question,
        options: newPoll.options,
        createdByMe: true,
        createdAt: new Date(),
        votes: new Array(newPoll.options.length).fill(0),
        category: newPoll.category,
        status: "active",
        totalVotes: 0,
      },
    ]);

    setNewPoll({ question: "", options: ["", ""], category: "" });
    setShowAddPoll(false);
    setActiveTab("mine");
  };

  const handleCancel = () => {
    setNewPoll({ question: "", options: ["", ""], category: "" });
    setShowAddPoll(false);
  };

  const handleVote = (pollId: number, optionIndex: number) => {
    if (votedPolls.has(pollId)) return;

    setPolls((prev) =>
      prev.map((poll) => {
        if (poll.id === pollId) {
          const newVotes = [
            ...(poll.votes || Array(poll.options.length).fill(0)),
          ];
          newVotes[optionIndex] += 1;
          const newTotalVotes = (poll.totalVotes || 0) + 1;
          
          return {
            ...poll,
            votes: newVotes,
            totalVotes: newTotalVotes,
          };
        }
        return poll;
      })
    );

    setVotedPolls((prev) => {
      const updated = new Set(prev);
      updated.add(pollId);
      return updated;
    });
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  const filteredPolls = polls.filter((poll) => {
    if (activeTab === "mine" && !poll.createdByMe) return false;
    if (statusFilter !== "all" && poll.status !== statusFilter) return false;
    if (categoryFilter !== "all" && poll.category !== categoryFilter)
      return false;
    return true;
  });

  const categories = Array.from(
    new Set(polls.map((p) => p.category).filter(Boolean))
  );

  return (
    <div
      className="min-h-screen p-6 space-y-6"
      style={{ backgroundColor: theme.background }}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1
            className="text-3xl font-bold"
            style={{ color: theme.textPrimary }}
          >
            Community Polls
          </h1>
          <p className="text-sm mt-1" style={{ color: theme.textTertiary }}>
            Create and manage community polls to gather opinions
          </p>
        </div>
        <Button
          onClick={() => setShowAddPoll(true)}
          className="flex items-center gap-2 hover:opacity-90 transition-opacity"
          style={{
            background: theme.buttonPrimary?.bg || theme.primary,
            color: theme.buttonPrimary?.text || "white",
          }}
        >
          <Plus className="h-4 w-4" />
          Create Poll
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="rounded-lg border p-6 shadow-sm hover:shadow-md transition-shadow"
            style={{
              backgroundColor: theme.cardBackground,
              borderColor: theme.border,
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p
                  className="text-sm font-medium"
                  style={{ color: theme.textSecondary }}
                >
                  {stat.title}
                </p>
                <p
                  className="text-3xl font-bold mt-2"
                  style={{ color: theme.textPrimary }}
                >
                  {stat.value}
                </p>
                <p
                  className="text-xs mt-1"
                  style={{ color: theme.textTertiary }}
                >
                  {stat.description}
                </p>
              </div>
              <div
                className={`${stat.color} p-3 rounded-lg`}
                style={{ opacity: 0.9 }}
              >
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters and Tabs Section */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Tabs */}
          <div
            className="inline-flex rounded-lg border p-1"
            style={{ borderColor: theme.border }}
          >
            <button
              onClick={() => setActiveTab("all")}
              className={`px-6 py-2.5 rounded-md transition-colors ${
                activeTab === "all" ? "font-semibold" : "hover:opacity-80"
              }`}
              style={{
                backgroundColor:
                  activeTab === "all" ? theme.primary : "transparent",
                color: activeTab === "all" ? "white" : theme.textSecondary,
              }}
            >
              All Polls ({polls.length})
            </button>
            <button
              onClick={() => setActiveTab("mine")}
              className={`px-6 py-2.5 rounded-md transition-colors ${
                activeTab === "mine" ? "font-semibold" : "hover:opacity-80"
              }`}
              style={{
                backgroundColor:
                  activeTab === "mine" ? theme.primary : "transparent",
                color: activeTab === "mine" ? "white" : theme.textSecondary,
              }}
            >
              My Polls ({polls.filter((p) => p.createdByMe).length})
            </button>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter
                className="h-4 w-4"
                style={{ color: theme.textSecondary }}
              />
              <span className="text-sm" style={{ color: theme.textSecondary }}>
                Filter by:
              </span>
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-lg border text-sm"
              style={{
                backgroundColor: theme.cardBackground,
                borderColor: theme.border,
                color: theme.textPrimary,
              }}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="closed">Closed</option>
            </select>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 rounded-lg border text-sm"
              style={{
                backgroundColor: theme.cardBackground,
                borderColor: theme.border,
                color: theme.textPrimary,
              }}
            >
              <option value="all">All Categories</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Polls Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredPolls.length > 0 ? (
            filteredPolls.map((poll) => (
              <PollCard
                key={poll.id}
                poll={poll}
                onVote={handleVote}
                votedPolls={votedPolls}
                formatDate={formatDate}
                theme={theme}
              />
            ))
          ) : (
            <div
              className="col-span-full text-center py-16 rounded-lg border"
              style={{
                backgroundColor: theme.cardBackground,
                borderColor: theme.border,
              }}
            >
              <div className="max-w-md mx-auto">
                <BarChart3
                  className="h-16 w-16 mx-auto mb-4"
                  style={{ color: theme.textTertiary }}
                />
                <h3
                  className="text-lg font-semibold mb-2"
                  style={{ color: theme.textPrimary }}
                >
                  No polls found
                </h3>
                <p
                  className="text-sm mb-6"
                  style={{ color: theme.textTertiary }}
                >
                  {activeTab === "mine"
                    ? "You haven't created any polls yet."
                    : "No polls match your filters."}
                </p>
                <button
                  onClick={() => setShowAddPoll(true)}
                  className="px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
                  style={{
                    background: theme.primary,
                    color: "white",
                  }}
                >
                  Create Your First Poll
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Poll Modal */}
      {showAddPoll && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <div
            className="rounded-xl shadow-2xl max-w-lg w-full p-6"
            style={{
              backgroundColor: theme.cardBackground,
              borderColor: theme.border,
              borderWidth: "1px",
            }}
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2
                  className="text-xl font-bold"
                  style={{ color: theme.textPrimary }}
                >
                  Create New Poll
                </h2>
                <p
                  className="text-sm mt-1"
                  style={{ color: theme.textTertiary }}
                >
                  Gather opinions from the community
                </p>
              </div>
              <button
                onClick={handleCancel}
                className="p-2 hover:opacity-70 transition-opacity rounded-lg"
                style={{ color: theme.textSecondary }}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: theme.textSecondary }}
                >
                  Poll Question *
                </label>
                <textarea
                  value={newPoll.question}
                  onChange={(e) =>
                    setNewPoll({ ...newPoll, question: e.target.value })
                  }
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 resize-none"
                  style={{
                    backgroundColor:
                      theme.inputBackground || theme.cardBackground,
                    borderColor: theme.border,
                    color: theme.textPrimary,
                  }}
                  placeholder="What would you like to ask the community?"
                  rows={3}
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: theme.textSecondary }}
                >
                  Category *
                </label>
                <input
                  value={newPoll.category}
                  onChange={(e) =>
                    setNewPoll({ ...newPoll, category: e.target.value })
                  }
                  className="w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor:
                      theme.inputBackground || theme.cardBackground,
                    borderColor: theme.border,
                    color: theme.textPrimary,
                  }}
                  placeholder="e.g., Infrastructure, Community, Events"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label
                    className="block text-sm font-medium"
                    style={{ color: theme.textSecondary }}
                  >
                    Options *
                  </label>
                  <span
                    className="text-sm"
                    style={{ color: theme.textTertiary }}
                  >
                    {newPoll.options.length}/6
                  </span>
                </div>
                <div className="space-y-3">
                  {newPoll.options.map((opt, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="flex-1">
                        <input
                          value={opt}
                          onChange={(e) => {
                            const updated = [...newPoll.options];
                            updated[index] = e.target.value;
                            setNewPoll({ ...newPoll, options: updated });
                          }}
                          className="w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2"
                          style={{
                            backgroundColor:
                              theme.inputBackground || theme.cardBackground,
                            borderColor: theme.border,
                            color: theme.textPrimary,
                          }}
                          placeholder={`Option ${index + 1}`}
                        />
                      </div>
                      {newPoll.options.length > 2 && (
                        <button
                          onClick={() => {
                            const updated = newPoll.options.filter(
                              (_, i) => i !== index
                            );
                            setNewPoll({ ...newPoll, options: updated });
                          }}
                          className="p-2 hover:opacity-70 transition-opacity"
                          style={{ color: theme.error || "#ef4444" }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                {newPoll.options.length < 6 && (
                  <button
                    onClick={handleAddOption}
                    className="mt-3 text-white inline-flex items-center gap-2 text-sm hover:opacity-80 transition-opacity"
                    style={{ color: theme.primary }}
                  >
                    <Plus className="h-4 w-4" />
                    Add option
                  </button>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-6 mt-6 border-t">
              <button
                onClick={handleCancel}
                className="px-5 py-2.5 border rounded-lg hover:opacity-80 transition-opacity"
                style={{
                  borderColor: theme.border,
                  color: theme.textSecondary,
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleCreatePoll}
                className="px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
                style={{
                  background: theme.primary,
                  color: "white",
                }}
              >
                <Check className="h-4 w-4" />
                Publish Poll
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Poll Card Component
interface PollCardProps {
  poll: Poll;
  onVote: (pollId: number, optionIndex: number) => void;
  votedPolls: Set<number>;
  formatDate: (date: Date) => string;
  theme: any;
}

function PollCard({
  poll,
  onVote,
  votedPolls,
  formatDate,
  theme,
}: PollCardProps) {
  const hasVoted = votedPolls.has(poll.id);
  
  // Calculate total votes from the votes array
  const totalVotes = poll.votes?.reduce((sum, vote) => sum + vote, 0) || 0;

  return (
    <div
      className="rounded-lg border overflow-hidden hover:shadow-lg transition-shadow"
      style={{
        backgroundColor: theme.cardBackground,
        borderColor: theme.border,
      }}
    >
      <div className="p-6">
        {/* Poll Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {poll.createdByMe && (
                <span
                  className=" text-white inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium"
                  style={{
                    backgroundColor: `${theme.primary}15`,
                    color: theme.primary,
                  }}
                >
                  <User className="h-3 w-3 " />
                  Your Poll
                </span>
              )}
              <span
                className="text-xs px-2 py-1 rounded"
                style={{
                  backgroundColor:
                    poll.status === "active"
                      ? `${theme.success || "#22c55e"}15`
                      : `${theme.textTertiary}15`,
                  color:
                    poll.status === "active"
                      ? theme.success || "#22c55e"
                      : theme.textTertiary,
                }}
              >
                {poll.status === "active" ? "Active" : "Closed"}
              </span>
            </div>
            <h3
              className="text-lg font-semibold mb-2"
              style={{ color: theme.textPrimary }}
            >
              {poll.question}
            </h3>
            <div className="flex items-center gap-2 text-sm">
              <span style={{ color: theme.textTertiary }}>
                {formatDate(poll.createdAt)}
              </span>
              <span style={{ color: theme.textTertiary }}>•</span>
              <span style={{ color: theme.textSecondary }}>
                {poll.category}
              </span>
            </div>
          </div>
        </div>

        {/* Poll Options */}
        <div className="space-y-3 mb-6">
          {poll.options.map((option, index) => {
            const votes = poll.votes?.[index] || 0;
            // Calculate percentage - FIXED LOGIC
            const percentage = totalVotes > 0 ? (votes / totalVotes) * 100 : 0;

            return (
              <button
                key={index}
                onClick={() =>
                  !hasVoted &&
                  poll.status === "active" &&
                  onVote(poll.id, index)
                }
                disabled={hasVoted || poll.status === "closed"}
                className={`w-full text-left p-4 rounded-lg transition-all ${
                  hasVoted
                    ? "cursor-default"
                    : poll.status === "active"
                    ? "hover:opacity-90"
                    : "cursor-not-allowed"
                }`}
                style={{
                  backgroundColor: hasVoted
                    ? `${theme.primary}10`
                    : theme.cardBackground,
                  borderColor: theme.border,
                  borderWidth: "1px",
                }}
              >
                <div className="flex justify-between items-center mb-1.5">
                  <span
                    className="font-medium"
                    style={{ color: theme.textPrimary }}
                  >
                    {option}
                  </span>
                  {hasVoted && (
                    <span
                      className="text-sm font-semibold text-white"
                      style={{ color: theme.primary }}
                    >
                      {percentage.toFixed(1)}%
                    </span>
                  )}
                </div>
                {hasVoted && (
                  <>
                    <div
                      className="h-2 rounded-full overflow-hidden"
                      style={{ backgroundColor: `${theme.border}50` }}
                    >
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          backgroundColor: theme.primary,
                          width: `${percentage}%`,
                        }}
                      />
                    </div>

                    <div className="text-xs flex justify-between mt-1.5">
                      <span style={{ color: theme.textTertiary }}>
                        {votes} vote{votes !== 1 ? "s" : ""}
                      </span>
                      <span style={{ color: theme.textTertiary }}>
                        {percentage.toFixed(1)}%
                      </span>
                    </div>
                  </>
                )}
              </button>
            );
          })}
        </div>

        {/* Poll Footer */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div
            className="flex items-center gap-2 text-sm"
            style={{ color: theme.textTertiary }}
          >
            <BarChart3 className="h-4 w-4" />
            <span>
              {totalVotes} total vote{totalVotes !== 1 ? "s" : ""}
            </span>
          </div>
          {poll.status === "active" && !hasVoted ? (
            <button
              onClick={() => {}}
              className="px-4 py-2 rounded-lg hover:opacity-90 transition-opacity text-sm font-medium"
              style={{
                background: theme.primary,
                color: "white",
              }}
            >
              Vote Now
            </button>
          ) : hasVoted ? (
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
              style={{
                backgroundColor: `${theme.success || "#22c55e"}15`,
                color: theme.success || "#22c55e",
              }}
            >
              <Check className="h-4 w-4" />
              Voted
            </div>
          ) : (
            <div
              className="px-4 py-2 rounded-lg text-sm font-medium"
              style={{
                backgroundColor: `${theme.textTertiary}15`,
                color: theme.textTertiary,
              }}
            >
              Closed
            </div>
          )}
        </div>
      </div>
    </div>
  );
}