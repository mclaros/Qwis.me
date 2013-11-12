object @user
attributes :id, :created_at, :username, :description
node(:avatar_small) { @user.avatar.url(:small) }
node(:avatar_big) { @user.avatar.url(:big) }
