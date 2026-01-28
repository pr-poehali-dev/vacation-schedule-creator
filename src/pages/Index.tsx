import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('year');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');

  const statsCards = [
    {
      title: 'Использовано дней',
      value: '12',
      total: '28',
      icon: 'Calendar',
      trend: '+2 за месяц',
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Запланировано',
      value: '8',
      total: '28',
      icon: 'CalendarCheck',
      trend: '3 заявки',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Доступно',
      value: '16',
      total: '28',
      icon: 'CalendarDays',
      trend: 'до конца года',
      color: 'from-emerald-500 to-teal-500'
    },
    {
      title: 'В отпуске сейчас',
      value: '4',
      total: '24',
      icon: 'Users',
      trend: 'сотрудника',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const upcomingVacations = [
    {
      name: 'Анна Смирнова',
      department: 'Маркетинг',
      dates: '15-22 февраля',
      days: 8,
      avatar: 'АС',
      status: 'approved'
    },
    {
      name: 'Иван Петров',
      department: 'Разработка',
      dates: '1-14 марта',
      days: 14,
      avatar: 'ИП',
      status: 'approved'
    },
    {
      name: 'Мария Козлова',
      department: 'Продажи',
      dates: '20-27 февраля',
      days: 7,
      avatar: 'МК',
      status: 'pending'
    }
  ];

  const monthlyTrends = [
    { month: 'Янв', value: 8, color: 'bg-purple-500' },
    { month: 'Фев', value: 12, color: 'bg-purple-500' },
    { month: 'Мар', value: 15, color: 'bg-pink-500' },
    { month: 'Апр', value: 10, color: 'bg-purple-500' },
    { month: 'Май', value: 18, color: 'bg-pink-500' },
    { month: 'Июн', value: 22, color: 'bg-pink-500' },
    { month: 'Июл', value: 25, color: 'bg-secondary' },
    { month: 'Авг', value: 20, color: 'bg-pink-500' },
    { month: 'Сен', value: 14, color: 'bg-purple-500' },
    { month: 'Окт', value: 11, color: 'bg-purple-500' },
    { month: 'Ноя', value: 9, color: 'bg-purple-500' },
    { month: 'Дек', value: 16, color: 'bg-purple-500' }
  ];

  const teamStats = [
    { department: 'Разработка', used: 65, available: 35 },
    { department: 'Маркетинг', used: 48, available: 52 },
    { department: 'Продажи', used: 72, available: 28 },
    { department: 'HR', used: 55, available: 45 },
    { department: 'Поддержка', used: 60, available: 40 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
        
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 animate-fade-in">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              Управление отпусками
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">
              Январь 2026 • 24 сотрудника
            </p>
          </div>
          <div className="flex gap-3">
            <Select defaultValue="export">
              <SelectTrigger className="w-[140px] h-11">
                <Icon name="Download" size={18} className="mr-2" />
                <SelectValue placeholder="Экспорт" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem 
                  value="excel"
                  onClick={() => {
                    toast({
                      title: 'Экспорт в Excel',
                      description: 'Файл vacation_report.xlsx загружается...'
                    });
                  }}
                >
                  <div className="flex items-center gap-2">
                    <Icon name="FileSpreadsheet" size={16} />
                    Excel
                  </div>
                </SelectItem>
                <SelectItem 
                  value="pdf"
                  onClick={() => {
                    toast({
                      title: 'Экспорт в PDF',
                      description: 'Файл vacation_report.pdf загружается...'
                    });
                  }}
                >
                  <div className="flex items-center gap-2">
                    <Icon name="FileText" size={16} />
                    PDF
                  </div>
                </SelectItem>
                <SelectItem 
                  value="csv"
                  onClick={() => {
                    toast({
                      title: 'Экспорт в CSV',
                      description: 'Файл vacation_report.csv загружается...'
                    });
                  }}
                >
                  <div className="flex items-center gap-2">
                    <Icon name="Download" size={16} />
                    CSV
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:scale-105 transition-transform">
                  <Icon name="Plus" size={18} />
                  Запланировать отпуск
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle className="text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Новая заявка на отпуск</DialogTitle>
                  <DialogDescription>
                    Заполните форму для создания заявки. Она будет отправлена на согласование.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="start-date">Дата начала</Label>
                    <Input 
                      id="start-date" 
                      type="date" 
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="end-date">Дата окончания</Label>
                    <Input 
                      id="end-date" 
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="reason">Причина (необязательно)</Label>
                    <Input 
                      id="reason" 
                      placeholder="Семейный отпуск, путешествие..."
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Отмена</Button>
                  <Button 
                    className="bg-gradient-to-r from-purple-600 to-pink-600"
                    onClick={() => {
                      if (!startDate || !endDate) {
                        toast({
                          title: 'Ошибка',
                          description: 'Укажите даты начала и окончания отпуска',
                          variant: 'destructive'
                        });
                        return;
                      }
                      toast({
                        title: 'Заявка создана!',
                        description: 'Ваша заявка отправлена на согласование',
                      });
                      setIsDialogOpen(false);
                      setStartDate('');
                      setEndDate('');
                      setReason('');
                    }}
                  >
                    Отправить заявку
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-scale-in">
          {statsCards.map((stat, index) => (
            <Card 
              key={index} 
              className="p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 bg-white/80 backdrop-blur-sm"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between">
                <div className="space-y-2 flex-1">
                  <p className="text-sm text-muted-foreground font-medium">{stat.title}</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-4xl font-bold bg-gradient-to-br {stat.color} bg-clip-text text-transparent">
                      {stat.value}
                    </p>
                    <span className="text-lg text-muted-foreground">/ {stat.total}</span>
                  </div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Icon name="TrendingUp" size={14} className="text-green-500" />
                    {stat.trend}
                  </p>
                </div>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white`}>
                  <Icon name={stat.icon as any} size={24} />
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="overview" className="w-full animate-fade-in" style={{ animationDelay: '400ms' }}>
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid h-auto p-1 bg-white/60 backdrop-blur-sm">
            <TabsTrigger value="overview" className="gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white">
              <Icon name="LayoutDashboard" size={18} />
              Обзор
            </TabsTrigger>
            <TabsTrigger value="calendar" className="gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white">
              <Icon name="Calendar" size={18} />
              Календарь
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white">
              <Icon name="BarChart3" size={18} />
              Аналитика
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            <Card className="p-4 border-0 bg-white/60 backdrop-blur-sm mb-6">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <div className="flex items-center gap-2 flex-1">
                  <Icon name="Filter" size={18} className="text-muted-foreground" />
                  <span className="text-sm font-medium">Фильтры:</span>
                </div>
                <div className="flex flex-wrap gap-3 w-full sm:w-auto">
                  <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Отдел" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все отделы</SelectItem>
                      <SelectItem value="development">Разработка</SelectItem>
                      <SelectItem value="marketing">Маркетинг</SelectItem>
                      <SelectItem value="sales">Продажи</SelectItem>
                      <SelectItem value="hr">HR</SelectItem>
                      <SelectItem value="support">Поддержка</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Период" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="year">Весь год</SelectItem>
                      <SelectItem value="month">Текущий месяц</SelectItem>
                      <SelectItem value="quarter">Квартал</SelectItem>
                      <SelectItem value="week">Неделя</SelectItem>
                    </SelectContent>
                  </Select>

                  {(selectedDepartment !== 'all' || selectedPeriod !== 'year') && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => {
                        setSelectedDepartment('all');
                        setSelectedPeriod('year');
                        toast({
                          title: 'Фильтры сброшены',
                          description: 'Показаны все данные'
                        });
                      }}
                      className="gap-2"
                    >
                      <Icon name="X" size={16} />
                      Сбросить
                    </Button>
                  )}
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6 border-0 bg-white/80 backdrop-blur-sm shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold">Ближайшие отпуска</h3>
                  <Button variant="ghost" size="sm" className="gap-2">
                    Все
                    <Icon name="ArrowRight" size={16} />
                  </Button>
                </div>
                <div className="space-y-4">
                  {upcomingVacations.map((vacation, index) => (
                    <div 
                      key={index} 
                      className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 hover:shadow-md transition-all"
                    >
                      <Avatar className="h-12 w-12 border-2 border-white shadow-md">
                        <AvatarFallback className="bg-gradient-to-br from-purple-600 to-pink-600 text-white font-semibold">
                          {vacation.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold truncate">{vacation.name}</p>
                        <p className="text-sm text-muted-foreground">{vacation.department}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{vacation.dates}</p>
                        <Badge variant={vacation.status === 'approved' ? 'default' : 'secondary'} className="mt-1">
                          {vacation.days} дней
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6 border-0 bg-white/80 backdrop-blur-sm shadow-lg">
                <h3 className="text-xl font-semibold mb-6">Использование по месяцам</h3>
                <div className="space-y-3">
                  {monthlyTrends.map((trend, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <span className="text-sm font-medium w-8">{trend.month}</span>
                      <div className="flex-1 h-10 bg-gray-100 rounded-lg overflow-hidden relative">
                        <div 
                          className={`h-full ${trend.color} rounded-lg transition-all duration-500 hover:scale-x-105 origin-left flex items-center justify-end px-3`}
                          style={{ 
                            width: `${(trend.value / 25) * 100}%`,
                            animationDelay: `${index * 50}ms`
                          }}
                        >
                          <span className="text-white text-sm font-semibold">{trend.value}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="calendar" className="mt-6">
            <Card className="p-6 border-0 bg-white/80 backdrop-blur-sm shadow-lg">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-xl border-0"
                  />
                  <div className="mt-6 space-y-3">
                    <h4 className="font-semibold text-lg">Легенда</h4>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-purple-500"></div>
                        <span className="text-sm">Запланировано</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-pink-500"></div>
                        <span className="text-sm">В процессе</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-blue-500"></div>
                        <span className="text-sm">Завершено</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">События на {date?.toLocaleDateString('ru-RU')}</h4>
                  <div className="space-y-3">
                    <div className="p-4 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                        <p className="font-medium text-sm">Анна Смирнова</p>
                      </div>
                      <p className="text-xs text-muted-foreground">Отпуск 15-22 февраля</p>
                    </div>
                    <div className="p-4 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        <p className="font-medium text-sm">Иван Петров</p>
                      </div>
                      <p className="text-xs text-muted-foreground">Отпуск 1-14 марта</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6 border-0 bg-white/80 backdrop-blur-sm shadow-lg">
                <h3 className="text-xl font-semibold mb-6">Использование по отделам</h3>
                <div className="space-y-6">
                  {teamStats.map((dept, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{dept.department}</span>
                        <span className="text-muted-foreground">{dept.used}% использовано</span>
                      </div>
                      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500"
                          style={{ width: `${dept.used}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6 border-0 bg-white/80 backdrop-blur-sm shadow-lg">
                <h3 className="text-xl font-semibold mb-6">Ключевые метрики</h3>
                <div className="space-y-6">
                  <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm opacity-90">Средняя длительность</p>
                      <Icon name="Clock" size={20} />
                    </div>
                    <p className="text-3xl font-bold">12.5 дней</p>
                  </div>
                  
                  <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm opacity-90">Коэффициент использования</p>
                      <Icon name="TrendingUp" size={20} />
                    </div>
                    <p className="text-3xl font-bold">68%</p>
                  </div>

                  <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm opacity-90">Планирование на год</p>
                      <Icon name="CalendarCheck" size={20} />
                    </div>
                    <p className="text-3xl font-bold">87%</p>
                  </div>

                  <div className="p-4 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 text-white">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm opacity-90">Пиковый период</p>
                      <Icon name="Activity" size={20} />
                    </div>
                    <p className="text-3xl font-bold">Июль</p>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <Card className="p-6 border-0 bg-white/80 backdrop-blur-sm shadow-lg animate-fade-in" style={{ animationDelay: '500ms' }}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-semibold">Профиль сотрудника</h3>
              <p className="text-sm text-muted-foreground mt-1">Личная информация и баланс отпуска</p>
            </div>
            <Button variant="outline" className="gap-2">
              <Icon name="Settings" size={18} />
              Настройки
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20 border-4 border-white shadow-lg">
                <AvatarFallback className="bg-gradient-to-br from-purple-600 to-pink-600 text-white text-2xl font-bold">
                  ВИ
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-lg font-semibold">Василий Иванов</p>
                <p className="text-sm text-muted-foreground">Старший разработчик</p>
                <Badge className="mt-2 bg-gradient-to-r from-purple-600 to-pink-600">Разработка</Badge>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 space-y-2">
              <p className="text-sm text-muted-foreground">Доступно дней</p>
              <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">16</p>
              <p className="text-xs text-muted-foreground">из 28 дней в году</p>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 space-y-2">
              <p className="text-sm text-muted-foreground">Следующий отпуск</p>
              <p className="text-lg font-semibold">1-14 марта</p>
              <p className="text-xs text-muted-foreground">14 дней • Одобрено</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Index;