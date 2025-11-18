#!/bin/bash

SESSION_NAME="drick"

tmux has-session -t $SESSION_NAME 2>/dev/null

if [ $? != 0 ]; then
  tmux new-session -s $SESSION_NAME -n nvim -d

  tmux set-option -t $SESSION_NAME mouse on

  tmux send-keys -t $SESSION_NAME:nvim "nvim ." C-m

  tmux new-window -t $SESSION_NAME -n server
  tmux send-keys -t $SESSION_NAME:server "pnpm dev" C-m

  tmux new-window -t $SESSION_NAME -n cmd

  tmux select-window -t $SESSION_NAME:nvim
fi

tmux attach-session -t $SESSION_NAME
