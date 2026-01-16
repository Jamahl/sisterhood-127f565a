import { useState } from "react";
import { Heart, MessageCircle, Send, Pencil, Trash2, X, Check } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "@/hooks/use-toast";

interface Comment {
  id: string;
  author: string;
  text: string;
  time: string;
}

interface MoodCardProps {
  name: string;
  avatar: string;
  mood: string;
  moodEmoji: string;
  cycleDay: string;
  message?: string;
  time: string;
  sisterhoodName?: string;
}

const MoodCard = ({ name, avatar, mood, moodEmoji, cycleDay, message, time, sisterhoodName }: MoodCardProps) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [liked, setLiked] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [hasReplied, setHasReplied] = useState(false);

  const quickReplies = [
    { text: "I'm here for you 💕", color: "bg-lavender/60" },
    { text: "Thinking of you 💭", color: "bg-sage/40" },
    { text: "You are loved 🤍", color: "bg-secondary/60" },
    { text: "Sending hugs 🫂", color: "bg-peach/60" },
    { text: "You've got this 💪", color: "bg-blush-light" },
  ];

  const handleAddComment = (text?: string) => {
    const commentText = text || newComment.trim();
    if (commentText && commentText.length <= 100) {
      setComments([
        ...comments,
        {
          id: Date.now().toString(),
          author: "You",
          text: commentText,
          time: "Just now"
        }
      ]);
      setNewComment("");
      setHasReplied(true);
      
      // Simulate notification for the recipient (in real app, this would be sent to them)
      toast({
        title: `💬 Comment sent to ${name}`,
        description: commentText.length > 40 ? commentText.slice(0, 40) + "..." : commentText,
      });
    }
  };

  const handleToggleLike = () => {
    const newLikedState = !liked;
    setLiked(newLikedState);
    
    if (newLikedState) {
      toast({
        title: `💕 Love sent to ${name}`,
        description: "They'll feel the warmth!",
      });
    }
  };

  const handleEditComment = (comment: Comment) => {
    setEditingId(comment.id);
    setEditText(comment.text);
  };

  const handleSaveEdit = (id: string) => {
    if (editText.trim() && editText.length <= 100) {
      setComments(comments.map(c => 
        c.id === id ? { ...c, text: editText.trim() } : c
      ));
      setEditingId(null);
      setEditText("");
    }
  };

  const handleDeleteComment = (id: string) => {
    setComments(comments.filter(c => c.id !== id));
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  return (
    <div className="bg-card rounded-3xl p-5 shadow-card animate-slide-up border border-border/30">
      <div className="flex items-start gap-4">
        <div className="relative">
          <img 
            src={avatar} 
            alt={name}
            className="w-14 h-14 rounded-2xl object-cover border-2 border-blush-light"
          />
          <span className="absolute -bottom-1 -right-1 text-xl">{moodEmoji}</span>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-foreground">{name}</h3>
            <span className="text-xs text-muted-foreground">{time}</span>
          </div>
          
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <span className="text-sm font-medium text-primary">{mood}</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-xs text-muted-foreground bg-lavender/50 px-2 py-0.5 rounded-full">
              {cycleDay}
            </span>
            {sisterhoodName && (
              <>
                <span className="text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground bg-sage/30 px-2 py-0.5 rounded-full">
                  {sisterhoodName}
                </span>
              </>
            )}
          </div>
          
          {message && (
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
              {message}
            </p>
          )}
        </div>
      </div>
      
      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border/50">
        <Button 
          variant={liked ? "default" : "soft"} 
          size="sm" 
          className="flex-1 gap-2"
          onClick={handleToggleLike}
        >
          <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
          {liked ? "Loved" : "Send Love"}
        </Button>
        <Button 
          variant={showComments ? "default" : "ghost"} 
          size="sm" 
          className="gap-2"
          onClick={() => setShowComments(!showComments)}
        >
          <MessageCircle className="w-4 h-4" />
          {comments.length > 0 && <span>{comments.length}</span>}
        </Button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="mt-4 pt-4 border-t border-border/50 space-y-3">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-2">
              <div className="flex-1 bg-muted/50 rounded-2xl px-3 py-2">
                {editingId === comment.id ? (
                  <div className="space-y-2">
                    <Input
                      value={editText}
                      onChange={(e) => setEditText(e.target.value.slice(0, 100))}
                      className="text-sm rounded-xl bg-background border-border"
                      autoFocus
                    />
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-muted-foreground">{editText.length}/100</span>
                      <div className="flex gap-1">
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="h-6 w-6"
                          onClick={handleCancelEdit}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                        <Button 
                          size="icon" 
                          variant="soft" 
                          className="h-6 w-6"
                          onClick={() => handleSaveEdit(comment.id)}
                          disabled={!editText.trim()}
                        >
                          <Check className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-foreground">{comment.author}</span>
                      <div className="flex items-center gap-1">
                        <span className="text-[10px] text-muted-foreground">{comment.time}</span>
                        {comment.author === "You" && (
                          <>
                            <Button 
                              size="icon" 
                              variant="ghost" 
                              className="h-5 w-5 opacity-60 hover:opacity-100"
                              onClick={() => handleEditComment(comment)}
                            >
                              <Pencil className="w-2.5 h-2.5" />
                            </Button>
                            <Button 
                              size="icon" 
                              variant="ghost" 
                              className="h-5 w-5 opacity-60 hover:opacity-100 hover:text-destructive"
                              onClick={() => handleDeleteComment(comment.id)}
                            >
                              <Trash2 className="w-2.5 h-2.5" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-0.5">{comment.text}</p>
                  </>
                )}
              </div>
            </div>
          ))}
          
          {/* Quick Replies - hide after user has replied */}
          {!hasReplied && (
            <div className="flex flex-wrap gap-2">
              {quickReplies.map((reply, index) => (
                <button
                  key={index}
                  onClick={() => handleAddComment(reply.text)}
                  className={`${reply.color} px-3 py-1.5 rounded-full text-xs font-medium text-foreground/80 
                    hover:scale-105 hover:shadow-soft transition-all duration-200 active:scale-95`}
                >
                  {reply.text}
                </button>
              ))}
            </div>
          )}

          <div className="flex gap-2 items-center">
            <Input
              placeholder="Or type your own..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value.slice(0, 100))}
              className="flex-1 text-sm rounded-full bg-muted/50 border-0"
              onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
            />
            <Button 
              size="icon" 
              variant="soft"
              onClick={() => handleAddComment()}
              disabled={!newComment.trim()}
              className="rounded-full h-10 w-10"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-[10px] text-muted-foreground text-right">
            {newComment.length}/100
          </p>
        </div>
      )}
    </div>
  );
};

export default MoodCard;
